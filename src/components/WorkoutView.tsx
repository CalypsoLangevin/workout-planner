import { useState } from 'react'
import { workouts } from '../data/workouts'
import { useWorkoutSession } from '../hooks/useWorkoutSession'
import ExerciseCard from './ExerciseCard'

interface Props {
  workoutType: 'A' | 'B'
  session: ReturnType<typeof useWorkoutSession>
  onFinish: () => void
  onCancel: () => void
}

export default function WorkoutView({ workoutType, session, onFinish, onCancel }: Props) {
  const [confirmCancel, setConfirmCancel] = useState(false)
  const workout = workouts[workoutType]
  const { active, updateSet, finishSession, cancelSession, getPreviousSession } = session
  const prev = getPreviousSession(workoutType)

  if (!active) return null

  const allExercises = [...workout.warmup, ...workout.main]
  const totalSets = allExercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedSets = active.exercises.reduce(
    (acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0
  )
  const pct = Math.round((completedSets / totalSets) * 100)

  function handleFinish() {
    finishSession()
    onFinish()
  }

  function handleCancel() {
    cancelSession()
    onCancel()
  }

  return (
    <div className="pb-10">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3"
        style={{ background: 'rgba(3,3,8,0.80)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white font-bold text-lg tracking-tight leading-tight">{workout.title}</h2>
            <p className="text-white/40 text-xs">{workout.subtitle}</p>
          </div>
          <button
            onClick={() => setConfirmCancel(true)}
            className="glass-btn text-white/50 hover:text-white/70 text-sm px-3.5 py-2 rounded-xl min-h-[40px] transition-colors"
          >
            Cancel
          </button>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-400/80 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-white/30 shrink-0 tabular-nums">{completedSets}/{totalSets}</span>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6">
        {/* Warm-up */}
        <section>
          <p className="text-[10px] font-semibold text-blue-400/60 uppercase tracking-widest mb-3">Warm-up</p>
          <div className="space-y-2.5">
            {workout.warmup.map(ex => {
              const log = active.exercises.find(e => e.exerciseId === ex.id)
              const prevLog = prev?.exercises.find(e => e.exerciseId === ex.id)
              if (!log) return null
              return (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  log={log}
                  prevLog={prevLog}
                  onSetChange={(si, patch) => updateSet(ex.id, si, patch)}
                  isWarmup
                />
              )
            })}
          </div>
        </section>

        {/* Main work */}
        <section>
          <p className="text-[10px] font-semibold text-purple-400/60 uppercase tracking-widest mb-3">Main Work</p>
          <div className="space-y-2.5">
            {workout.main.map(ex => {
              const log = active.exercises.find(e => e.exerciseId === ex.id)
              const prevLog = prev?.exercises.find(e => e.exerciseId === ex.id)
              if (!log) return null
              return (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  log={log}
                  prevLog={prevLog}
                  onSetChange={(si, patch) => updateSet(ex.id, si, patch)}
                />
              )
            })}
          </div>
        </section>

        <div className="pb-4">
          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-purple-500/60 hover:bg-purple-500/80 text-white font-bold text-base active:scale-98 transition-all backdrop-blur border border-purple-400/20"
          >
            Finish Workout 🎉
          </button>
        </div>
      </div>

      {confirmCancel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          <div className="w-full max-w-sm glass rounded-3xl p-6 space-y-4">
            <h3 className="text-white font-bold text-lg">Cancel workout?</h3>
            <p className="text-white/50 text-sm">Your progress won't be saved.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancel(false)}
                className="flex-1 py-4 rounded-2xl glass-btn text-white font-semibold min-h-[52px]"
              >
                Keep going
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-4 rounded-2xl bg-red-500/50 border border-red-400/20 text-white font-semibold min-h-[52px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
