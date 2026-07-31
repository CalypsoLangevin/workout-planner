import type { Session } from '../hooks/useWorkoutSession'
import type { WorkoutTemplate } from '../data/workouts'
import { templateToWorkoutDefinition } from '../data/workouts'

interface Props {
  sessions: Session[]
  templates: WorkoutTemplate[]
  onStart: (templateId: string) => void
  onHistory: () => void
  onManageTemplates: () => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const ACCENT_COLORS = [
  { gradient: 'from-violet-500/25 to-purple-600/10', ring: 'border-violet-400/30', btn: 'bg-violet-500/70 hover:bg-violet-500/90 border-violet-400/30' },
  { gradient: 'from-blue-500/25 to-sky-600/10', ring: 'border-blue-400/30', btn: 'bg-blue-500/70 hover:bg-blue-500/90 border-blue-400/30' },
  { gradient: 'from-emerald-500/20 to-teal-600/10', ring: 'border-emerald-400/30', btn: 'bg-emerald-500/70 hover:bg-emerald-500/90 border-emerald-400/30' },
  { gradient: 'from-pink-500/20 to-rose-600/10', ring: 'border-pink-400/30', btn: 'bg-pink-500/70 hover:bg-pink-500/90 border-pink-400/30' },
]

export default function Dashboard({ sessions, templates, onStart, onHistory, onManageTemplates }: Props) {
  const days = new Set(sessions.map(s => s.date.slice(0, 10)))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 60; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (days.has(d.toISOString().slice(0, 10))) streak++
    else if (i > 0) break
  }

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

      {/* Template cards */}
      <div className="px-4 space-y-4">
        {templates.length === 0 && (
          <div className="text-center py-12 text-white/25">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">No workout templates yet.</p>
          </div>
        )}

        {templates.map((t, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length]
          const def = templateToWorkoutDefinition(t)
          const last = sessions.filter(s => s.workoutType === t.id).at(-1)

          return (
            <div key={t.id} className={`rounded-3xl overflow-hidden border ${color.ring} bg-gradient-to-br ${color.gradient} glass`}>
              <div className="px-5 pt-5 pb-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-white font-bold text-lg tracking-tight">{t.name}</h2>
                    <p className="text-white/50 text-sm">{def.main.length} exercises</p>
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
                  onClick={() => onStart(t.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-base text-white active:scale-98 transition-all backdrop-blur border ${color.btn}`}
                >
                  Start {t.name}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Manage templates */}
      <div className="px-4 mt-4">
        <button
          onClick={onManageTemplates}
          className="w-full py-4 rounded-2xl glass text-white/70 font-semibold hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <span>📋</span>
          <span>Manage Templates</span>
          {templates.length > 0 && (
            <span className="text-white/40 text-sm font-normal">· {templates.length}</span>
          )}
        </button>
      </div>

      {/* History */}
      <div className="px-4 mt-3">
        <button
          onClick={onHistory}
          className="w-full py-4 rounded-2xl glass text-white/70 font-semibold hover:text-white transition-colors flex items-center justify-center gap-2"
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
