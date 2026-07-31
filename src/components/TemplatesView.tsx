import { useState } from 'react'
import type { WorkoutTemplate } from '../data/workouts'
import { exerciseBankById } from '../data/workouts'

interface Props {
  templates: WorkoutTemplate[]
  onSave: (templates: WorkoutTemplate[]) => Promise<void>
  onBack: () => void
  syncing: boolean
}

const ACCENT_COLORS = [
  { ring: 'border-violet-400/30', btn: 'bg-violet-500/70 border-violet-400/30', badge: 'bg-violet-500/40 border-violet-400/25' },
  { ring: 'border-blue-400/30', btn: 'bg-blue-500/70 border-blue-400/30', badge: 'bg-blue-500/40 border-blue-400/25' },
  { ring: 'border-emerald-400/30', btn: 'bg-emerald-500/70 border-emerald-400/30', badge: 'bg-emerald-500/40 border-emerald-400/25' },
  { ring: 'border-pink-400/30', btn: 'bg-pink-500/70 border-pink-400/30', badge: 'bg-pink-500/40 border-pink-400/25' },
]

// Group exercises by muscle area for the picker
const muscleGroups: { label: string; ids: string[] }[] = [
  { label: 'Lower Body', ids: ['a1-goblet-squat', 'a2-rdl', 'a6-hip-thrust', 'b1-leg-press', 'b2-sl-rdl', 'b7-clamshell'] },
  { label: 'Upper Body Pull', ids: ['a3-lat-pulldown', 'a5-cable-row', 'b3-pullup'] },
  { label: 'Upper Body Push', ids: ['a4-shoulder-press', 'b4-incline-press', 'b5-lateral-raise'] },
  { label: 'Core', ids: ['a7-plank', 'b6-dead-bug'] },
]

// ─── Exercise picker modal ─────────────────────────────────────────────────────

function ExercisePicker({
  selected,
  onToggle,
  onClose,
}: {
  selected: string[]
  onToggle: (id: string) => void
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-center gap-3 px-4 pt-5 pb-3 shrink-0">
        <button
          onClick={onClose}
          className="glass-btn w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors shrink-0"
        >
          ←
        </button>
        <h2 className="text-white font-bold text-lg tracking-tight flex-1">Exercise Bank</h2>
        <span className="text-white/30 text-sm">{selected.length} selected</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-5">
        {muscleGroups.map(group => (
          <div key={group.label}>
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">{group.label}</p>
            <div className="space-y-2">
              {group.ids.map(id => {
                const ex = exerciseBankById[id]
                if (!ex) return null
                const on = selected.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => onToggle(id)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                      on
                        ? 'bg-purple-500/20 border-purple-400/40'
                        : 'glass border-white/8 hover:border-white/15'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      on ? 'bg-purple-500/80 border-purple-400/50' : 'border-white/20'
                    }`}>
                      {on && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{ex.name}</p>
                      <p className="text-white/40 text-xs">{ex.muscles}</p>
                    </div>
                    <span className="text-white/25 text-xs shrink-0">
                      {ex.sets}×{ex.type === 'timed' ? `${ex.duration}s` : `${ex.reps}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Template editor ───────────────────────────────────────────────────────────

function TemplateEditor({
  template,
  onSave,
  onCancel,
}: {
  template: WorkoutTemplate
  onSave: (t: WorkoutTemplate) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(template.name)
  const [exerciseIds, setExerciseIds] = useState<string[]>(template.exerciseIds)
  const [pickerOpen, setPickerOpen] = useState(false)

  function toggleExercise(id: string) {
    setExerciseIds(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  function moveUp(i: number) {
    if (i === 0) return
    setExerciseIds(prev => {
      const next = [...prev]
      ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
      return next
    })
  }

  function moveDown(i: number) {
    setExerciseIds(prev => {
      if (i === prev.length - 1) return prev
      const next = [...prev]
      ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
      return next
    })
  }

  return (
    <>
      {pickerOpen && (
        <ExercisePicker
          selected={exerciseIds}
          onToggle={toggleExercise}
          onClose={() => setPickerOpen(false)}
        />
      )}

      <div className="min-h-svh pb-10">
        <div
          className="sticky top-0 z-10 px-4 pt-4 pb-3"
          style={{ background: 'rgba(3,3,8,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="glass-btn w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white shrink-0">←</button>
            <h2 className="text-white font-bold text-lg tracking-tight flex-1">
              {template.id ? 'Edit Template' : 'New Template'}
            </h2>
            <button
              onClick={() => onSave({ ...template, name, exerciseIds })}
              disabled={!name.trim() || exerciseIds.length === 0}
              className="px-4 py-2 rounded-xl bg-purple-500/70 border border-purple-400/30 text-white text-sm font-bold disabled:opacity-30 transition-all"
            >
              Save
            </button>
          </div>
        </div>

        <div className="px-4 pt-5 space-y-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Template Name</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Push Day, Leg Day…"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 text-sm outline-none focus:border-purple-400/50 transition-colors"
            />
          </label>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                Exercises ({exerciseIds.length})
              </span>
              <button
                onClick={() => setPickerOpen(true)}
                className="text-xs text-purple-300/70 hover:text-purple-300 font-semibold transition-colors"
              >
                + Add / Remove
              </button>
            </div>

            {exerciseIds.length === 0 && (
              <button
                onClick={() => setPickerOpen(true)}
                className="w-full py-10 rounded-2xl border border-dashed border-white/10 text-white/25 text-sm hover:border-white/20 transition-colors"
              >
                Tap to pick exercises from the bank
              </button>
            )}

            <div className="space-y-2">
              {exerciseIds.map((id, i) => {
                const ex = exerciseBankById[id]
                if (!ex) return null
                return (
                  <div key={id} className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button onClick={() => moveUp(i)} disabled={i === 0} className="text-white/20 hover:text-white/50 disabled:opacity-20 text-xs leading-none">▲</button>
                      <button onClick={() => moveDown(i)} disabled={i === exerciseIds.length - 1} className="text-white/20 hover:text-white/50 disabled:opacity-20 text-xs leading-none">▼</button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{ex.name}</p>
                      <p className="text-white/35 text-xs">{ex.muscles}</p>
                    </div>
                    <button
                      onClick={() => toggleExercise(id)}
                      className="text-white/20 hover:text-red-400/60 transition-colors text-sm shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Main view ─────────────────────────────────────────────────────────────────

export default function TemplatesView({ templates, onSave, onBack, syncing }: Props) {
  const [editing, setEditing] = useState<WorkoutTemplate | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  async function handleSaveTemplate(t: WorkoutTemplate) {
    const updated = templates.some(x => x.id === t.id)
      ? templates.map(x => x.id === t.id ? t : x)
      : [...templates, t]
    await onSave(updated)
    setEditing(null)
  }

  async function handleDelete(id: string) {
    await onSave(templates.filter(t => t.id !== id))
    setConfirmDelete(null)
  }

  function handleNew() {
    setEditing({ id: crypto.randomUUID(), name: '', exerciseIds: [] })
  }

  if (editing) {
    return (
      <TemplateEditor
        template={editing}
        onSave={handleSaveTemplate}
        onCancel={() => setEditing(null)}
      />
    )
  }

  return (
    <div className="min-h-svh pb-10">
      <div
        className="sticky top-0 z-10 px-4 pt-4 pb-3"
        style={{ background: 'rgba(3,3,8,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="glass-btn w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white shrink-0">←</button>
          <h2 className="text-white font-bold text-lg tracking-tight flex-1">Workout Templates</h2>
          {syncing && <span className="text-white/30 text-xs">Saving…</span>}
        </div>
      </div>

      <div className="px-4 pt-5 space-y-3">
        {templates.length === 0 && (
          <div className="text-center py-16 text-white/25">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">No templates yet.<br />Create one to get started.</p>
          </div>
        )}

        {templates.map((t, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length]
          return (
            <div key={t.id} className={`glass rounded-3xl border ${color.ring} px-5 py-4`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-white font-bold text-base">{t.name}</h3>
                  <p className="text-white/40 text-xs mt-0.5">{t.exerciseIds.length} exercises</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditing(t)}
                    className="glass-btn px-3 py-1.5 rounded-xl text-white/50 hover:text-white text-xs font-medium transition-colors"
                  >
                    Edit
                  </button>
                  {confirmDelete === t.id ? (
                    <div className="flex gap-1.5">
                      <button onClick={() => setConfirmDelete(null)} className="glass-btn px-2.5 py-1.5 rounded-xl text-white/50 text-xs">Keep</button>
                      <button onClick={() => handleDelete(t.id)} className="px-2.5 py-1.5 rounded-xl bg-red-500/40 border border-red-400/20 text-white/80 text-xs">Delete</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(t.id)}
                      className="glass-btn px-3 py-1.5 rounded-xl text-red-400/40 hover:text-red-400/70 text-xs font-medium transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {t.exerciseIds.slice(0, 5).map(id => (
                  <span key={id} className="text-xs glass-sm text-white/50 rounded-full px-2.5 py-1">
                    {exerciseBankById[id]?.name ?? id}
                  </span>
                ))}
                {t.exerciseIds.length > 5 && (
                  <span className="text-xs text-white/30 py-1">+{t.exerciseIds.length - 5} more</span>
                )}
              </div>
            </div>
          )
        })}

        <button
          onClick={handleNew}
          className="w-full py-4 rounded-2xl border border-dashed border-white/15 text-white/50 hover:text-white/70 hover:border-white/25 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none">+</span> New Template
        </button>
      </div>
    </div>
  )
}
