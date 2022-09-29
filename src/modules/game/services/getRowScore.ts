import type { DiceFace } from 'src/core/@types/DiceFace'

export const getRowScore = (states: (DiceFace | null)[]) => {
  // count dices
  const countedDices = states.reduce((acc, val) => {
    if (val !== null) acc[val] = (acc[val] ?? 0) + 1

    return acc
  }, {})

  // calculate scores
  const totalScore = Object.entries(countedDices).reduce((acc, [key, val]) => {
    // key is DiceFace, val is counted abount of dice in that row
    return acc + Number(key) * Math.pow(Number(val), 2)
  }, 0)

  return totalScore
}
