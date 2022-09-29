import type { DiceFace } from '../../../core/@types/DiceFace'

export const rollTheDice = (): DiceFace =>
  ((window.crypto.getRandomValues(new Uint16Array(1))[0] % 6) + 1) as DiceFace
