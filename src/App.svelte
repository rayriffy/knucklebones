<script lang="ts">
  import Player from './modules/game/components/Player.svelte'

  import { getPlayerScore } from './modules/game/services/getPlayerScore'

  import type { GameSystem } from './modules/game/@types/GameSystem'
  import type { DiceFace } from './core/@types/DiceFace'

  let gameSystem: GameSystem = {
    turn: 1,
    currentActor: ['a', 'b'][Math.floor(Math.random() * 2)],
    boardState: {
      a: {
        column1: [null, null, null],
        column2: [null, null, null],
        column3: [null, null, null],
      },
      b: {
        column1: [null, null, null],
        column2: [null, null, null],
        column3: [null, null, null],
      },
    },
  }

  let onPlaceBlock = (player: string, dice: DiceFace, column: number) => {
    console.log(player, column, dice)

    let playerBoardColumn: (DiceFace | null)[] = gameSystem.boardState[player][`column${column}`]
    // check if user is able to place block in that column
    if (playerBoardColumn.includes(null)) {
      // place in available spot
      playerBoardColumn[playerBoardColumn.findIndex(o => o === null)] = dice
      gameSystem.boardState[player][`column${column}`] = playerBoardColumn

      // destroy opponent dice in the same column
      let opponentPlayer = player === 'a' ? 'b' : 'a'
      // opponent column is mirrored on player perspective
      let targetOpponentColumn = column === 1 ? 3 : column === 3 ? 1 : 2
      let opponentBoardColumn: (DiceFace | null)[] = gameSystem.boardState[opponentPlayer][`column${targetOpponentColumn}`]

      let filteredColumn = opponentBoardColumn.filter(o => o !== null && o !== dice)

      filteredColumn = filteredColumn.concat(new Array(3 - filteredColumn.length).fill(null))

      gameSystem.boardState[opponentPlayer][`column${targetOpponentColumn}`] = filteredColumn

      // to next turn, and send control to opponent
      gameSystem.turn = gameSystem.turn + 1
      gameSystem.currentActor = opponentPlayer
    }
  }

  $: playerAScore = getPlayerScore(gameSystem.boardState['a'])
  $: playerBScore = getPlayerScore(gameSystem.boardState['b'])
</script>

<main class="h-full p-8 flex flex-col justify-between">
  <Player
    player="b"
    currentActor={gameSystem.currentActor}
    boardState={gameSystem.boardState['b']}
    onPlaceBlock={onPlaceBlock}
    score={{
      a: playerAScore,
      b: playerBScore
    }}
    class="rotate-180"
  />
  <div class="flex justify-between">
    <div class="flex space-x-4">
      <p>Turn {gameSystem.turn}</p>
      <p>Current player: {gameSystem.currentActor}</p>
    </div>
  </div>
  <Player
    player="a"
    currentActor={gameSystem.currentActor}
    boardState={gameSystem.boardState['a']}
    onPlaceBlock={onPlaceBlock}
    score={{
      a: playerAScore,
      b: playerBScore
    }}
  />
</main>
