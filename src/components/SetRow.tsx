import type { SetLog } from '../hooks/useWorkoutSession'

interface Props {
  setIndex: number
  totalSets: number
  log: SetLog
  onChange: (patch: Partial<SetLog>) => void
}

export default function SetRow({ setIndex, totalSets, log, onChange }: Props) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all ${
      log.completed
        ? 'bg-purple-500/15 border border-purple-400/25'
        : 'glass-sm'
    }`}>
      <span className="text-xs text-white/40 w-12 shrink-0 font-medium text-center">
        {setIndex + 1}/{totalSets}
      </span>

      <div className="flex-1 flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[10px] text-white/30 uppercase tracking-wider text-center">kg</label>
          <input
            type="number"
            inputMode="decimal"
            value={log.weight}
            onChange={e => onChange({ weight: e.target.value })}
            disabled={log.completed}
            className="glass-input w-full rounded-xl px-2 py-2.5 text-white text-base font-semibold text-center min-h-[44px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[10px] text-white/30 uppercase tracking-wider text-center">reps</label>
          <input
            type="number"
            inputMode="numeric"
            value={log.reps}
            onChange={e => onChange({ reps: e.target.value })}
            disabled={log.completed}
            className="glass-input w-full rounded-xl px-2 py-2.5 text-white text-base font-semibold text-center min-h-[44px]"
          />
        </div>
      </div>

      <button
        onClick={() => onChange({ completed: !log.completed })}
        className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-bold text-base transition-all active:scale-90 ${
          log.completed
            ? 'bg-purple-500/80 text-white border border-purple-400/30'
            : 'glass-btn text-white/40'
        }`}
      >
        {log.completed ? '✓' : '○'}
      </button>
    </div>
  )
}
