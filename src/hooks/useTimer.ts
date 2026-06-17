import { useState, useEffect, useRef, useCallback } from 'react'

export type TimerState = 'idle' | 'running' | 'paused' | 'done'

export interface UseTimerReturn {
  state: TimerState
  remaining: number
  total: number
  progress: number
  start: (seconds: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
}

function beep() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = 960
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
    ctx.close()
  } catch {
    // audio not available
  }
}

function vibrate() {
  try { navigator.vibrate?.([150, 60, 150]) } catch { /* ignore */ }
}

export function useTimer(): UseTimerReturn {
  const [state, setState] = useState<TimerState>('idle')
  const [remaining, setRemaining] = useState(0)
  const [total, setTotal] = useState(0)

  // Wall-clock references — survive JS pauses from screen lock
  const endTimeRef = useRef<number | null>(null)   // absolute ms timestamp when timer ends
  const pausedRemRef = useRef<number>(0)            // remaining seconds when paused
  const rafRef = useRef<number | null>(null)
  const firedRef = useRef(false)

  const cancelRaf = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const tick = useCallback(() => {
    if (endTimeRef.current === null) return
    const left = Math.max(0, Math.ceil((endTimeRef.current - performance.now()) / 1000))
    setRemaining(left)

    if (left <= 0) {
      if (!firedRef.current) {
        firedRef.current = true
        setState('done')
        beep()
        vibrate()
      }
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback((seconds: number) => {
    cancelRaf()
    firedRef.current = false
    setTotal(seconds)
    setRemaining(seconds)
    endTimeRef.current = performance.now() + seconds * 1000
    setState('running')
  }, [])

  const pause = useCallback(() => {
    if (endTimeRef.current !== null) {
      pausedRemRef.current = Math.max(0, Math.ceil((endTimeRef.current - performance.now()) / 1000))
    }
    cancelRaf()
    endTimeRef.current = null
    setState('paused')
  }, [])

  const resume = useCallback(() => {
    firedRef.current = false
    endTimeRef.current = performance.now() + pausedRemRef.current * 1000
    setState('running')
  }, [])

  const reset = useCallback(() => {
    cancelRaf()
    endTimeRef.current = null
    firedRef.current = false
    setState('idle')
    setRemaining(0)
    setTotal(0)
  }, [])

  // Start/stop the rAF loop based on state
  useEffect(() => {
    if (state === 'running') {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      cancelRaf()
    }
    return cancelRaf
  }, [state, tick])

  // Re-sync after tab visibility change (phone unlock)
  useEffect(() => {
    function onVisible() {
      if (state === 'running' && endTimeRef.current !== null) {
        cancelRaf()
        const left = Math.max(0, Math.ceil((endTimeRef.current - performance.now()) / 1000))
        setRemaining(left)
        if (left <= 0) {
          if (!firedRef.current) {
            firedRef.current = true
            setState('done')
            beep()
            vibrate()
          }
        } else {
          rafRef.current = requestAnimationFrame(tick)
        }
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [state, tick])

  return {
    state,
    remaining,
    total,
    progress: total > 0 ? 1 - remaining / total : 0,
    start,
    pause,
    resume,
    reset,
  }
}
