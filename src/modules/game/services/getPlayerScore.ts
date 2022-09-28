import type { BoardState } from '../@types/BoardState'
import { getRowScore } from './getRowScore'

export const getPlayerScore = (boardState: BoardState) =>
  getRowScore(boardState.column1) +
  getRowScore(boardState.column2) +
  getRowScore(boardState.column3)
