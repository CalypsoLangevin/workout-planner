import { useState } from 'react'
import type { GitHubConfig } from '../hooks/useGitHubStorage'

interface Props {
  onSave: (config: GitHubConfig) => void
}

export default function GitHubSetup({ onSave }: Props) {
  const [token, setToken] = useState('')
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')
  const [testing, setTesting] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    setTesting(true)
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      })
      if (res.status === 401) throw new Error('Invalid token — check your PAT.')
      if (res.status === 404) throw new Error('Repo not found — check owner and repo name.')
      if (!res.ok) throw new Error(`GitHub error: ${res.status}`)
      onSave({ token, owner, repo })
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Connection failed')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-svh flex flex-col justify-center px-6 pb-16">
      <div className="mb-10">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">Connect GitHub</h1>
        <p className="text-white/50 text-sm leading-relaxed">
          Your workout data will be saved as <span className="text-white/70 font-mono">data.json</span> in a GitHub repo you own.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Personal Access Token</span>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="github_pat_..."
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 text-sm outline-none focus:border-purple-400/50 transition-colors"
          />
          <span className="text-white/30 text-xs">
            Needs <span className="text-white/50">Contents</span> read &amp; write permission.
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">GitHub Username</span>
          <input
            type="text"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            placeholder="your-username"
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 text-sm outline-none focus:border-purple-400/50 transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Repository Name</span>
          <input
            type="text"
            value={repo}
            onChange={e => setRepo(e.target.value)}
            placeholder="workout-data"
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 text-sm outline-none focus:border-purple-400/50 transition-colors"
          />
        </label>

        {err && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{err}</p>
        )}

        <button
          type="submit"
          disabled={testing}
          className="mt-2 w-full py-4 rounded-2xl bg-purple-500/70 hover:bg-purple-500/90 border border-purple-400/30 text-white font-bold text-base transition-all disabled:opacity-50"
        >
          {testing ? 'Connecting…' : 'Connect & Continue'}
        </button>
      </form>
    </div>
  )
}
