import { useState } from 'react'
import { useTimer } from '../hooks/useTimer'
import type { ExerciseDefinition } from '../data/workouts'

interface Props {
  exercise: ExerciseDefinition
  setIndex: number
  totalSets: number
  onComplete: () => void
  isCompleted: boolean
}

const SIZE = 140
const R = 56
const CIRC = 2 * Math.PI * R

export default function TimerCard({ exercise, setIndex, totalSets, onComplete, isCompleted }: Props) {
  const { state, remaining, progress, start, pause, resume, reset } = useTimer()
  const [customDuration, setCustomDuration] = useState(exercise.duration ?? 30)

  const dashOffset = CIRC * (1 - progress)

  function handleDone() {
    reset()
    onComplete()
  }

  if (isCompleted) {
    return (
      <div className="glass-sm rounded-2xl px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-white/60">Set {setIndex + 1}/{totalSets}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">{customDuration}s</span>
          <span className="w-7 h-7 rounded-full bg-purple-500/80 flex items-center justify-center text-white text-xs font-bold">✓</span>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white/70">Set {setIndex + 1} / {totalSets}</span>
        {state === 'idle' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCustomDuration(d => Math.max(5, d - 5))}
              className="glass-btn w-8 h-8 rounded-full text-white font-bold text-base flex items-center justify-center active:scale-90 transition-transform"
            >−</button>
            <span className="text-white font-semibold text-sm w-12 text-center">{customDuration}s</span>
            <button
              onClick={() => setCustomDuration(d => d + 5)}
              className="glass-btn w-8 h-8 rounded-full text-white font-bold text-base flex items-center justify-center active:scale-90 transition-transform"
            >+</button>
          </div>
        )}
        {state !== 'idle' && (
          <span className="text-xs text-white/40 uppercase tracking-widest">
            {state === 'running' ? 'Hold it' : state === 'paused' ? 'Paused' : 'Done!'}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-5">
        {/* Circular timer */}
        <div className="relative">
          <svg width={SIZE} height={SIZE} className="-rotate-90" style={{ display: 'block' }}>
            {/* Track */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="7"
            />
            {/* Progress */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none"
              stroke={state === 'done' ? 'rgba(134,239,172,0.9)' : 'rgba(167,139,250,0.9)'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={state === 'idle' ? CIRC : dashOffset}
              style={{ transition: state === 'running' ? 'stroke-dashoffset 0.9s linear' : 'none' }}
            />
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center rotate-0">
            {state === 'idle' ? (
              <span className="text-white/30 text-2xl font-light">{customDuration}s</span>
            ) : state === 'done' ? (
              <span className="text-green-300 text-3xl">✓</span>
            ) : (
              <span className="text-white text-3xl font-bold tabular-nums">{remaining}</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 w-full">
          {state === 'idle' && (
            <button
              onClick={() => start(customDuration)}
              className="flex-1 py-3.5 rounded-2xl bg-purple-500/70 hover:bg-purple-500/90 text-white font-semibold text-base active:scale-98 transition-all backdrop-blur border border-purple-400/20"
            >
              Start
            </button>
          )}
          {state === 'running' && (
            <button
              onClick={pause}
              className="flex-1 py-3.5 rounded-2xl glass-btn text-white font-semibold active:scale-98 transition-all"
            >
              Pause
            </button>
          )}
          {state === 'paused' && (
            <>
              <button
                onClick={resume}
                className="flex-1 py-3.5 rounded-2xl bg-purple-500/70 text-white font-semibold active:scale-98 transition-all backdrop-blur border border-purple-400/20"
              >
                Resume
              </button>
              <button
                onClick={reset}
                className="px-5 py-3.5 rounded-2xl glass-btn text-white/70 font-semibold active:scale-98 transition-all"
              >
                Reset
              </button>
            </>
          )}
          {state === 'done' && (
            <button
              onClick={handleDone}
              className="flex-1 py-3.5 rounded-2xl bg-green-500/60 hover:bg-green-500/80 text-white font-semibold active:scale-98 transition-all backdrop-blur border border-green-400/20"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
