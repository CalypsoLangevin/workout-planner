import type { Session } from '../hooks/useWorkoutSession'
import { workoutA, workoutB } from '../data/workouts'

interface Props {
  sessions: Session[]
  onStart: (type: 'A' | 'B') => void
  onHistory: () => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function Dashboard({ sessions, onStart, onHistory }: Props) {
  const lastA = sessions.filter(s => s.workoutType === 'A').at(-1)
  const lastB = sessions.filter(s => s.workoutType === 'B').at(-1)

  const days = new Set(sessions.map(s => s.date.slice(0, 10)))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 60; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (days.has(d.toISOString().slice(0, 10))) streak++
    else if (i > 0) break
  }

  const cards = [
    { def: workoutA, last: lastA, accent: 'from-violet-500/25 to-purple-600/10', ring: 'border-violet-400/30', btn: 'bg-violet-500/70 hover:bg-violet-500/90 border-violet-400/30' },
    { def: workoutB, last: lastB, accent: 'from-blue-500/25 to-sky-600/10', ring: 'border-blue-400/30', btn: 'bg-blue-500/70 hover:bg-blue-500/90 border-blue-400/30' },
  ]

  return (
    <div className="min-h-svh pb-10">
      {/* Hero */}
      <div className="px-5 pt-14 pb-8">
        <p className="text-white/60 text-sm font-medium tracking-wide mb-1">Good session incoming</p>
        <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight">
          Your Workout<br />Plan
        </h1>
        {streak > 0 && (
          <div className="mt-5 inline-flex items-center gap-2 glass rounded-full px-4 py-2">
            <span className="text-base">🔥</span>
            <span className="text-white/90 text-sm font-medium">{streak}-day streak</span>
          </div>
        )}
      </div>

      {/* Workout cards */}
      <div className="px-4 space-y-4">
        {cards.map(({ def, last, accent, ring, btn }) => (
          <div key={def.id} className={`rounded-3xl overflow-hidden border ${ring} bg-gradient-to-br ${accent} glass`}>
            <div className="px-5 pt-5 pb-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${ring} text-white/90 glass-sm`}>
                      {def.id}
                    </span>
                    <h2 className="text-white font-bold text-lg tracking-tight">{def.title}</h2>
                  </div>
                  <p className="text-white/60 text-sm">{def.subtitle}</p>
                </div>
                {last && (
                  <span className="text-xs text-white/50 shrink-0 mt-1">Last: {formatDate(last.date)}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {def.main.slice(0, 4).map(ex => (
                  <span key={ex.id} className="text-xs glass-sm text-white/70 rounded-full px-3 py-1">
                    {ex.name}
                  </span>
                ))}
                {def.main.length > 4 && (
                  <span className="text-xs text-white/40 py-1">+{def.main.length - 4}</span>
                )}
              </div>

              <button
                onClick={() => onStart(def.id)}
                className={`w-full py-4 rounded-2xl font-bold text-base text-white active:scale-98 transition-all backdrop-blur border ${btn}`}
              >
                Start Workout {def.id}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* History — always visible */}
      <div className="px-4 mt-4">
        <button
          onClick={onHistory}
          className="w-full py-4 rounded-2xl glass text-white/80 font-semibold hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <span>📊</span>
          <span>History & Progression</span>
          {sessions.length > 0 && (
            <span className="text-white/40 text-sm font-normal">· {sessions.length} sessions</span>
          )}
        </button>
      </div>

      {/* Tip */}
      <div className="mx-4 mt-4 px-4 py-3 glass-sm rounded-2xl">
        <p className="text-xs text-white/50 leading-relaxed">
          <span className="text-white/70 font-medium">Tip:</span> Add 1–2.5 kg when you complete all sets with 2 reps to spare. Rest ≥48h between sessions.
        </p>
      </div>
    </div>
  )
}
