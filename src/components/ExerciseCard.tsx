import { useState } from 'react'
import type { ExerciseDefinition } from '../data/workouts'
import type { ExerciseLog, SetLog } from '../hooks/useWorkoutSession'
import SetRow from './SetRow'
import TimerCard from './TimerCard'

interface Props {
  exercise: ExerciseDefinition
  log: ExerciseLog
  prevLog?: ExerciseLog
  onSetChange: (setIndex: number, patch: Partial<SetLog>) => void
  isWarmup?: boolean
}

export default function ExerciseCard({ exercise, log, prevLog, onSetChange, isWarmup }: Props) {
  const [expanded, setExpanded] = useState(false)
  const completedSets = log.sets.filter(s => s.completed).length
  const allDone = completedSets === log.sets.length

  return (
    <div className={`rounded-3xl overflow-hidden transition-all duration-200 ${
      allDone ? 'glass border border-purple-400/20' : 'glass'
    }`}>
      {/* Header row */}
      <button
        className="w-full text-left px-4 py-4 flex items-start gap-3 active:bg-white/[0.03] transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Status bubble */}
        <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold mt-0.5 transition-all ${
          allDone
            ? 'bg-purple-500/70 text-white border border-purple-400/30'
            : 'glass-btn text-white/50'
        }`}>
          {allDone ? '✓' : <span className="text-xs">{completedSets}/{exercise.sets}</span>}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-[15px] leading-snug">{exercise.name}</h3>
            {isWarmup && (
              <span className="text-[9px] bg-blue-400/10 text-blue-300 border border-blue-400/20 rounded-full px-2 py-0.5 uppercase tracking-widest font-semibold">
                Warm-up
              </span>
            )}
          </div>
          <p className="text-xs text-white/40 mt-0.5">{exercise.muscles}</p>
          {exercise.startingWeight && (
            <p className="text-xs text-purple-300/70 mt-0.5">Start: {exercise.startingWeight}</p>
          )}
          <p className="text-xs text-white/25 mt-0.5">
            {exercise.sets} sets ·{' '}
            {exercise.type === 'timed' ? `${exercise.duration}s hold` : `${exercise.reps} reps`}
          </p>
        </div>

        <span className={`text-white/25 text-xs mt-1.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-4 pb-5 space-y-4">
          {/* How to do it */}
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1.5">How to do it</p>
            <p className="text-sm text-white/70 leading-relaxed">{exercise.description}</p>
            <p className="text-xs text-purple-300/70 italic mt-1">{exercise.note}</p>
          </div>

          {/* Tips */}
          {exercise.tips.length > 0 && (
            <div className="glass-sm rounded-2xl px-3.5 py-3 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest text-green-400/60 font-semibold mb-2">Best practices</p>
              {exercise.tips.map((tip, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-green-400/60 text-xs mt-0.5 shrink-0">✦</span>
                  <p className="text-xs text-white/60 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          )}

          {/* Cautions */}
          {exercise.cautions.length > 0 && (
            <div className="glass-sm rounded-2xl px-3.5 py-3 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/60 font-semibold mb-2">Watch out for</p>
              {exercise.cautions.map((c, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-amber-400/60 text-xs mt-0.5 shrink-0">⚠</span>
                  <p className="text-xs text-white/60 leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          )}

          {/* Sets */}
          <div className="space-y-2">
            {log.sets.map((set, i) =>
              exercise.type === 'timed' ? (
                <TimerCard
                  key={i}
                  exercise={exercise}
                  setIndex={i}
                  totalSets={exercise.sets}
                  isCompleted={set.completed}
                  onComplete={() => onSetChange(i, { completed: true })}
                />
              ) : (
                <SetRow
                  key={i}
                  setIndex={i}
                  totalSets={exercise.sets}
                  log={set}
                  onChange={patch => onSetChange(i, patch)}
                />
              )
            )}
          </div>

          {/* Previous session reference */}
          {prevLog && exercise.type === 'reps' && (
            <p className="text-xs text-white/25 text-center">
              Last session:{' '}
              {prevLog.sets.filter(s => s.completed && s.weight).slice(0, 1).map(s =>
                `${s.weight} kg × ${s.reps} reps`
              ).join('') || 'no data yet'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
