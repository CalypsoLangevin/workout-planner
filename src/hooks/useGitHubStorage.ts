import { useState, useEffect, useCallback } from 'react'
import type { Session } from './useWorkoutSession'
import type { WorkoutTemplate } from '../data/workouts'

export interface GitHubConfig {
  token: string
  owner: string
  repo: string
}

export interface StorageData {
  sessions: Session[]
  templates: WorkoutTemplate[]
}

const CONFIG_KEY = 'gh_storage_config'
const DATA_FILE = 'data.json'

export function loadConfig(): GitHubConfig | null {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || 'null')
  } catch {
    return null
  }
}

export function saveConfig(config: GitHubConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

export function clearConfig() {
  localStorage.removeItem(CONFIG_KEY)
}

async function fetchFile(config: GitHubConfig): Promise<{ data: StorageData; sha: string } | null> {
  const res = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${DATA_FILE}`,
    { headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/vnd.github+json' } }
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const json = await res.json()
  const raw = JSON.parse(atob(json.content.replace(/\n/g, '')))
  // Migrate old format (plain array) to new shape
  const data: StorageData = Array.isArray(raw)
    ? { sessions: raw, templates: [] }
    : { sessions: raw.sessions ?? [], templates: raw.templates ?? [] }
  return { data, sha: json.sha }
}

async function writeFile(config: GitHubConfig, data: StorageData, sha: string | null) {
  const content = btoa(JSON.stringify(data, null, 2))
  const body: Record<string, string> = { message: 'Update workout data', content }
  if (sha) body.sha = sha
  const res = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${DATA_FILE}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) throw new Error(`GitHub write error: ${res.status}`)
  const json = await res.json()
  return json.content.sha as string
}

export function useGitHubStorage(config: GitHubConfig | null) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([])
  const [sha, setSha] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (!config) return
    setLoading(true)
    setError(null)
    fetchFile(config)
      .then(result => {
        if (result) {
          setSessions(result.data.sessions)
          setTemplates(result.data.templates)
          setSha(result.sha)
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [config?.token, config?.owner, config?.repo])

  const persist = useCallback(async (updatedSessions: Session[], updatedTemplates?: WorkoutTemplate[]) => {
    if (!config) return
    setSyncing(true)
    setError(null)
    const data: StorageData = {
      sessions: updatedSessions,
      templates: updatedTemplates ?? templates,
    }
    try {
      const newSha = await writeFile(config, data, sha)
      setSha(newSha)
      setSessions(updatedSessions)
      if (updatedTemplates) setTemplates(updatedTemplates)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }, [config, sha, templates])

  const persistSessions = useCallback((updated: Session[]) => persist(updated), [persist])
  const persistTemplates = useCallback((updated: WorkoutTemplate[]) => persist(sessions, updated), [persist, sessions])

  return { sessions, templates, persistSessions, persistTemplates, loading, syncing, error }
}
