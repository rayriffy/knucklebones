import type { BoardState } from './BoardState'

export interface GameSystem {
  turn: number
  currentActor: string
  isEnded: boolean
  boardState: Record<string, BoardState>
}
