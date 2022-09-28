import type { BoardState } from './BoardState'

export interface GameSystem {
  turn: number
  currentActor: string
  boardState: Record<string, BoardState>
}
