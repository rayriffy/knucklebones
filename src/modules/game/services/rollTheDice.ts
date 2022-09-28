import type { DiceFace } from '../../../core/@types/DiceFace'

export const rollTheDice = (): DiceFace =>
  ((Math.floor(Math.random() * 10000) % 6) + 1) as DiceFace
