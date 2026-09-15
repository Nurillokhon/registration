/**
 * Ro'yxatdan kelinganda uning manzili (tab, sahifa, qidiruv bilan) router state'da keladi —
 * ortga qaytilganda shu joyning o'ziga qaytiladi. State bo'lmasa (sahifa to'g'ridan-to'g'ri
 * ochilgan) `fallback` ishlatiladi.
 */
export function getBackPath(state: unknown, fallback: string) {
  if (typeof state === 'object' && state !== null && 'from' in state && typeof state.from === 'string') {
    return state.from
  }
  return fallback
}
