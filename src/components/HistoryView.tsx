import { useState } from 'react'
import type { Session } from '../hooks/useWorkoutSession'

interface Props {
  sessions: Session[]
  onDelete: (id: string) => void
  onBack: () => void
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function fmtDuration(min?: number) {
  if (!min) return null
  if (min < 60) return `${min} min`
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

// ─── Chart ────────────────────────────────────────────────────────────────────

interface ChartPoint { label: string; value: number }

function SparkLine({ points, color = '#a78bfa', height = 80 }: {
  points: ChartPoint[]
  color?: string
  height?: number
}) {
  if (points.length < 2) {
    return (
      <div className="flex items-center justify-center h-20 text-white/20 text-xs">
        Need at least 2 sessions to show chart
      </div>
    )
  }

  const W = 300
  const H = height
  const PAD_X = 8
  const PAD_Y = 10
  const innerW = W - PAD_X * 2
  const innerH = H - PAD_Y * 2

  const vals = points.map(p => p.value)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1

  const xs = points.map((_, i) => PAD_X + (i / (points.length - 1)) * innerW)
  const ys = points.map(p => PAD_Y + innerH - ((p.value - min) / range) * innerH)

  const linePath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${xs[xs.length - 1].toFixed(1)},${(H - PAD_Y + 4).toFixed(1)} L${PAD_X},${(H - PAD_Y + 4).toFixed(1)} Z`

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path d={areaPath} fill={`url(#grad-${color.replace('#', '')})`} />
        {/* Line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots */}
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="3.5" fill={color} opacity="0.9" />
        ))}
      </svg>
      {/* X labels */}
      <div className="flex justify-between mt-1 px-1">
        {points.map((p, i) => (
          <span key={i} className="text-[9px] text-white/25 leading-none">{p.label}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Per-exercise chart section ───────────────────────────────────────────────

function ExerciseCharts({ sessions }: { sessions: Session[] }) {
  // Collect all exercise ids that appear in at least one session with weight data
  const exerciseMap = new Map<string, { name: string; points: ChartPoint[] }>()

  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date))

  sorted.forEach(session => {
    const label = new Date(session.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    session.exercises.forEach(ex => {
      const completedWithWeight = ex.sets.filter(s => s.completed && s.weight && parseFloat(s.weight) > 0)
      if (completedWithWeight.length === 0) return
      const avgWeight = completedWithWeight.reduce((sum, s) => sum + parseFloat(s.weight), 0) / completedWithWeight.length

      if (!exerciseMap.has(ex.exerciseId)) {
        exerciseMap.set(ex.exerciseId, { name: ex.name, points: [] })
      }
      exerciseMap.get(ex.exerciseId)!.points.push({ label, value: parseFloat(avgWeight.toFixed(1)) })
    })
  })

  const entries = [...exerciseMap.entries()].filter(([, v]) => v.points.length >= 1)

  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-white/25 text-sm">
        Complete a few sessions with weights to see progression charts.
      </div>
    )
  }

  const colors = ['#a78bfa', '#60a5fa', '#34d399', '#f472b6', '#fb923c', '#facc15', '#a78bfa']

  return (
    <div className="space-y-5">
      {entries.map(([id, { name, points }], i) => (
        <div key={id} className="glass rounded-3xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white/80">{name}</p>
            {points.length >= 2 && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full glass-sm ${
                points[points.length - 1].value >= points[0].value
                  ? 'text-green-400/80'
                  : 'text-red-400/70'
              }`}>
                {points[points.length - 1].value >= points[0].value ? '↑' : '↓'}{' '}
                {Math.abs(points[points.length - 1].value - points[0].value).toFixed(1)} kg
              </span>
            )}
          </div>
          <SparkLine points={points} color={colors[i % colors.length]} />
          <p className="text-xs text-white/25 text-right">avg weight per session (kg)</p>
        </div>
      ))}
    </div>
  )
}

// ─── Volume chart (total kg moved per session) ────────────────────────────────

function VolumeChart({ sessions }: { sessions: Session[] }) {
  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date))

  const points: ChartPoint[] = sorted.map(s => {
    const totalVol = s.exercises.reduce((sum, ex) =>
      sum + ex.sets.filter(set => set.completed && set.weight && set.reps)
        .reduce((sv, set) => sv + parseFloat(set.weight || '0') * parseFloat(set.reps || '0'), 0)
      , 0)
    return {
      label: new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      value: Math.round(totalVol),
    }
  })

  if (points.every(p => p.value === 0)) return null

  return (
    <div className="glass rounded-3xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white/80">Total Volume</p>
        <p className="text-xs text-white/30">kg lifted per session</p>
      </div>
      <SparkLine points={points} color="#60a5fa" height={70} />
    </div>
  )
}

// ─── Duration chart ───────────────────────────────────────────────────────────

function DurationChart({ sessions }: { sessions: Session[] }) {
  const sorted = [...sessions].filter(s => s.durationMin).sort((a, b) => a.date.localeCompare(b.date))
  if (sorted.length < 2) return null

  const points: ChartPoint[] = sorted.map(s => ({
    label: new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    value: s.durationMin!,
  }))

  return (
    <div className="glass rounded-3xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white/80">Session Duration</p>
        <p className="text-xs text-white/30">minutes</p>
      </div>
      <SparkLine points={points} color="#34d399" height={70} />
    </div>
  )
}

// ─── Session detail card ──────────────────────────────────────────────────────

function SessionCard({ session, onDelete }: { session: Session; onDelete: () => void }) {
  const [open, setOpen] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)

  const completedExercises = session.exercises.filter(ex => ex.sets.some(s => s.completed))

  return (
    <div className="glass rounded-3xl overflow-hidden">
      <button
        className="w-full text-left px-4 py-4 flex items-center gap-3 active:bg-white/[0.03]"
        onClick={() => setOpen(o => !o)}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${
          session.workoutType === 'A'
            ? 'bg-violet-500/40 border-violet-400/25 text-white'
            : 'bg-blue-500/40 border-blue-400/25 text-white'
        }`}>
          {session.workoutType}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Workout {session.workoutType}</p>
          <p className="text-white/40 text-xs">{fmtDate(session.date)}</p>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-white/25 text-xs">{fmtTime(session.date)}{session.finishedAt ? ` → ${fmtTime(session.finishedAt)}` : ''}</span>
            {session.durationMin != null && (
              <span className="text-white/25 text-xs">· {fmtDuration(session.durationMin)}</span>
            )}
          </div>
        </div>

        <span className={`text-white/20 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-4">
          {/* Time summary */}
          <div className="flex gap-3 flex-wrap">
            <div className="glass-sm rounded-2xl px-3 py-2 flex-1 min-w-[120px]">
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Started</p>
              <p className="text-sm text-white/70 font-medium">{fmtTime(session.date)}</p>
            </div>
            {session.finishedAt && (
              <div className="glass-sm rounded-2xl px-3 py-2 flex-1 min-w-[120px]">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Finished</p>
                <p className="text-sm text-white/70 font-medium">{fmtTime(session.finishedAt)}</p>
              </div>
            )}
            {session.durationMin != null && (
              <div className="glass-sm rounded-2xl px-3 py-2 flex-1 min-w-[100px]">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Duration</p>
                <p className="text-sm text-white/70 font-medium">{fmtDuration(session.durationMin)}</p>
              </div>
            )}
          </div>

          {/* Exercise breakdown */}
          <div className="space-y-3">
            {completedExercises.map(ex => {
              const doneSets = ex.sets.filter(s => s.completed)
              const hasWeight = doneSets.some(s => s.weight && parseFloat(s.weight) > 0)
              const totalVol = hasWeight
                ? doneSets.reduce((sum, s) => sum + (parseFloat(s.weight || '0') * parseFloat(s.reps || '0')), 0)
                : 0

              return (
                <div key={ex.exerciseId} className="glass-sm rounded-2xl px-3 py-2.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-white/60 font-semibold">{ex.name}</p>
                    {totalVol > 0 && (
                      <span className="text-[10px] text-white/25">{Math.round(totalVol)} kg vol</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {doneSets.map((s, i) => (
                      <span key={i} className="text-xs glass text-white/50 rounded-xl px-2.5 py-1">
                        {s.weight ? `${s.weight} kg` : ''}{s.weight && s.reps ? ' × ' : ''}{s.reps ? `${s.reps} reps` : '✓'}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Delete */}
          {confirmDel ? (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDel(false)}
                className="flex-1 py-2.5 rounded-xl glass-btn text-white/60 text-sm font-medium"
              >Keep</button>
              <button
                onClick={onDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500/40 border border-red-400/20 text-white/80 text-sm font-medium"
              >Delete</button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDel(true)}
              className="text-xs text-red-400/40 hover:text-red-400/70 transition-colors"
            >
              Delete session
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main view ────────────────────────────────────────────────────────────────

type Tab = 'log' | 'charts'

export default function HistoryView({ sessions, onDelete, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('log')
  const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="min-h-svh pb-10">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-4 pb-0"
        style={{ background: 'rgba(3,3,8,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3 pb-3">
          <button onClick={onBack} className="glass-btn w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors shrink-0">
            ←
          </button>
          <h2 className="text-white font-bold text-lg tracking-tight">History</h2>
          <span className="ml-auto text-white/30 text-sm">{sessions.length} sessions</span>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 pb-3">
          {(['log', 'charts'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                tab === t
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {t === 'log' ? 'Session Log' : 'Progression'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 space-y-3">
        {tab === 'log' && (
          <>
            {sorted.length === 0 && (
              <div className="text-center py-24 text-white/25">
                <p className="text-5xl mb-4">🏋️</p>
                <p className="text-sm">No sessions yet.<br />Start your first workout!</p>
              </div>
            )}
            {sorted.map(s => (
              <SessionCard key={s.id} session={s} onDelete={() => onDelete(s.id)} />
            ))}
          </>
        )}

        {tab === 'charts' && (
          <div className="space-y-5">
            {sessions.length < 1 && (
              <div className="text-center py-24 text-white/25">
                <p className="text-5xl mb-4">📈</p>
                <p className="text-sm">Complete a workout to see your progression.</p>
              </div>
            )}
            {sessions.length >= 1 && (
              <>
                <VolumeChart sessions={sessions} />
                <DurationChart sessions={sessions} />
                <div className="pt-1">
                  <p className="text-[10px] uppercase tracking-widest text-white/25 font-semibold mb-3 px-1">Weight progression per exercise</p>
                  <ExerciseCharts sessions={sessions} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
