<script lang="ts">
  import Player from './modules/game/components/Player.svelte'

  import { getPlayerScore } from './modules/game/services/getPlayerScore'

  import type { GameSystem } from './modules/game/@types/GameSystem'
  import type { DiceFace } from './core/@types/DiceFace'
  import type { BoardState } from './modules/game/@types/BoardState'

  let gameSystem: GameSystem = {
    turn: 1,
    currentActor: ['a', 'b'][Math.floor(Math.random() * 2)],
    isEnded: false,
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

  /**
   * Main actor for entire game system
   * @param player player who interact with the game
   * @param dice dice face to be added into
   * @param column which column to be added
   */
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

      // determine if the game ended. game will ended when current actor have to move left
      gameSystem.isEnded = Object.entries(gameSystem.boardState[player]).every(([column, boardState]) => {
        return !(boardState as (DiceFace | null)[]).includes(null)
      })
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
      <p class="font-bold">Turn {gameSystem.turn}</p>
      <p>Current player: {gameSystem.currentActor.toUpperCase()}</p>
      {#if gameSystem.isEnded}
        <div class="bg-red-500 text-white rounded-md shadow uppercase text-sm px-2 py-0.5 font-bold">
          <p>Game ended</p>
        </div>
      {/if}
    </div>
    <div class="flex space-x-4 rotate-180">
      <p class="font-bold">Turn {gameSystem.turn}</p>
      <p>Current player: {gameSystem.currentActor.toUpperCase()}</p>
      {#if gameSystem.isEnded}
        <div class="bg-red-500 text-white rounded-md shadow uppercase text-sm px-2 py-0.5 font-bold">
          <p>Game ended</p>
        </div>
      {/if}
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
