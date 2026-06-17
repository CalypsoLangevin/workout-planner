import { useState } from 'react'
import { useWorkoutSession } from './hooks/useWorkoutSession'
import { workouts } from './data/workouts'
import Dashboard from './components/Dashboard'
import WorkoutView from './components/WorkoutView'
import HistoryView from './components/HistoryView'

type View = 'dashboard' | 'workout' | 'history' | 'done'

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
  const [view, setView] = useState<View>('dashboard')
  const [activeType, setActiveType] = useState<'A' | 'B'>('A')
  const session = useWorkoutSession()

  function handleStart(type: 'A' | 'B') {
    session.startSession(workouts[type])
    setActiveType(type)
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

  if (view === 'workout') {
    return (
      <Shell>
        <WorkoutView
          workoutType={activeType}
          session={session}
          onFinish={() => setView('done')}
          onCancel={() => setView('dashboard')}
        />
      </Shell>
    )
  }

  return (
    <Shell>
      <Dashboard
        sessions={session.sessions}
        onStart={handleStart}
        onHistory={() => setView('history')}
      />
    </Shell>
  )
}
