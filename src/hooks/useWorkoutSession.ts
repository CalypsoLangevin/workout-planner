import { useState, useCallback } from 'react'
import type { WorkoutDefinition, ExerciseDefinition } from '../data/workouts'

export interface SetLog {
  weight: string
  reps: string
  completed: boolean
}

export interface ExerciseLog {
  exerciseId: string
  name: string
  sets: SetLog[]
}

export interface Session {
  id: string
  date: string
  finishedAt?: string
  workoutType: string
  workoutName: string
  exercises: ExerciseLog[]
  durationMin?: number
}

function buildInitialLogs(exercises: ExerciseDefinition[], prev: Session | undefined): ExerciseLog[] {
  return exercises.map(ex => {
    const prevEx = prev?.exercises.find(e => e.exerciseId === ex.id)
    const defaultWeight = ex.defaultWeightKg != null ? String(ex.defaultWeightKg) : ''
    const defaultReps = ex.reps != null ? String(ex.reps) : ''
    return {
      exerciseId: ex.id,
      name: ex.name,
      sets: Array.from({ length: ex.sets }, (_, i) => ({
        weight: prevEx?.sets[i]?.weight ?? defaultWeight,
        reps: prevEx?.sets[i]?.reps ?? defaultReps,
        completed: false,
      })),
    }
  })
}

interface UseWorkoutSessionOptions {
  sessions: Session[]
  persist: (sessions: Session[]) => Promise<void>
}

export function useWorkoutSession({ sessions, persist }: UseWorkoutSessionOptions) {
  const [active, setActive] = useState<Session | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)

  const startSession = useCallback((workout: WorkoutDefinition) => {
    const allExercises = [...workout.warmup, ...workout.main]
    const prev = sessions.filter(s => s.workoutType === workout.id).at(-1)
    const logs = buildInitialLogs(allExercises, prev)
    const session: Session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      workoutType: workout.id,
      workoutName: workout.title,
      exercises: logs,
    }
    setActive(session)
    setStartTime(Date.now())
  }, [sessions])

  const updateSet = useCallback((exerciseId: string, setIndex: number, patch: Partial<SetLog>) => {
    setActive(prev => {
      if (!prev) return prev
      return {
        ...prev,
        exercises: prev.exercises.map(ex =>
          ex.exerciseId !== exerciseId ? ex : {
            ...ex,
            sets: ex.sets.map((s, i) => i !== setIndex ? s : { ...s, ...patch }),
          }
        ),
      }
    })
  }, [])

  const finishSession = useCallback(async () => {
    if (!active) return
    const now = Date.now()
    const durationMin = startTime ? Math.round((now - startTime) / 60000) : undefined
    const finished = { ...active, finishedAt: new Date(now).toISOString(), durationMin }
    const updated = [...sessions, finished]
    await persist(updated)
    setActive(null)
    setStartTime(null)
    return finished
  }, [active, sessions, startTime, persist])

  const cancelSession = useCallback(() => {
    setActive(null)
    setStartTime(null)
  }, [])

  const getPreviousSession = useCallback((workoutType: string) => {
    return sessions.filter(s => s.workoutType === workoutType).at(-1)
  }, [sessions])

  const deleteSession = useCallback(async (id: string) => {
    const updated = sessions.filter(s => s.id !== id)
    await persist(updated)
  }, [sessions, persist])

  return {
    sessions,
    active,
    startSession,
    updateSet,
    finishSession,
    cancelSession,
    getPreviousSession,
    deleteSession,
  }
}
