import type { DiceFace } from '../../../core/@types/DiceFace'

export interface BoardState {
  column1: (DiceFace | null)[]
  column2: (DiceFace | null)[]
  column3: (DiceFace | null)[]
}
