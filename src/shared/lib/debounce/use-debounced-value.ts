import { useEffect, useState } from 'react'

/** Qiymat `delayMs` davomida o'zgarmay turgandan keyingina yangilanadi (masalan, qidiruv so'rovi uchun). */
export function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delayMs)
    return () => window.clearTimeout(timer)
  }, [value, delayMs])

  return debouncedValue
}
