import { useState } from 'react'
import { useWorkoutSession } from './hooks/useWorkoutSession'
import { useGitHubStorage, loadConfig, saveConfig, type GitHubConfig } from './hooks/useGitHubStorage'
import { defaultTemplates, templateToWorkoutDefinition } from './data/workouts'
import type { WorkoutDefinition } from './data/workouts'
import Dashboard from './components/Dashboard'
import WorkoutView from './components/WorkoutView'
import HistoryView from './components/HistoryView'
import GitHubSetup from './components/GitHubSetup'
import TemplatesView from './components/TemplatesView'

type View = 'dashboard' | 'workout' | 'history' | 'templates' | 'done'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.28) 0%, transparent 65%), #111118' }}>
      <div className="max-w-md mx-auto min-h-svh">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  const [config, setConfig] = useState<GitHubConfig | null>(loadConfig)
  const [view, setView] = useState<View>('dashboard')
  const [activeWorkout, setActiveWorkout] = useState<WorkoutDefinition | null>(null)

  const { sessions, templates: storedTemplates, persistSessions, persistTemplates, loading, syncing, error } = useGitHubStorage(config)

  // Use stored templates if any, otherwise show default Workout A
  const templates = storedTemplates.length > 0 ? storedTemplates : defaultTemplates

  const session = useWorkoutSession({ sessions, persist: persistSessions })

  function handleConfigSave(cfg: GitHubConfig) {
    saveConfig(cfg)
    setConfig(cfg)
  }

  if (!config) {
    return (
      <Shell>
        <GitHubSetup onSave={handleConfigSave} />
      </Shell>
    )
  }

  if (loading) {
    return (
      <Shell>
        <div className="flex items-center justify-center min-h-svh">
          <p className="text-white/50 text-sm">Loading from GitHub…</p>
        </div>
      </Shell>
    )
  }

  function handleStart(templateId: string) {
    const template = templates.find(t => t.id === templateId)
    if (!template) return
    const def = templateToWorkoutDefinition(template)
    session.startSession(def)
    setActiveWorkout(def)
    setView('workout')
  }

  if (view === 'done') {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center min-h-svh px-6 text-center gap-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Workout complete!</h2>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            Great work. Rest up, eat well, and come back stronger.
          </p>
          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 w-full max-w-xs">
              Sync error: {error}
            </p>
          )}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => setView('history')}
              className="w-full py-4 rounded-2xl bg-purple-500/60 border border-purple-400/20 text-white font-bold text-base backdrop-blur"
            >
              View my history
            </button>
            <button
              onClick={() => setView('dashboard')}
              className="w-full py-4 rounded-2xl glass text-white/70 font-semibold text-base"
            >
              Back to home
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  if (view === 'history') {
    return (
      <Shell>
        <HistoryView
          sessions={session.sessions}
          onDelete={session.deleteSession}
          onBack={() => setView('dashboard')}
        />
      </Shell>
    )
  }

  if (view === 'workout' && activeWorkout) {
    return (
      <Shell>
        <WorkoutView
          workout={activeWorkout}
          session={session}
          onFinish={() => setView('done')}
          onCancel={() => setView('dashboard')}
        />
      </Shell>
    )
  }

  if (view === 'templates') {
    return (
      <Shell>
        <TemplatesView
          templates={templates}
          onSave={persistTemplates}
          onBack={() => setView('dashboard')}
          syncing={syncing}
        />
      </Shell>
    )
  }

  return (
    <Shell>
      {syncing && (
        <div className="fixed top-4 right-4 z-50 text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          Saving…
        </div>
      )}
      {error && (
        <div className="mx-4 mt-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
          Sync error: {error}
        </div>
      )}
      <Dashboard
        sessions={session.sessions}
        templates={templates}
        onStart={handleStart}
        onHistory={() => setView('history')}
        onManageTemplates={() => setView('templates')}
      />
    </Shell>
  )
}
