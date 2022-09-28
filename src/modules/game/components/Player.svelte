<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  import BoardRow from './BoardRow.svelte'
  import Dice from '../../player/components/Dice.svelte'

  import { rollTheDice } from '../../game/services/rollTheDice'
  import { getRowScore } from '../services/getRowScore'

  import type { DiceFace } from '../../../core/@types/DiceFace'
  import type { BoardState } from '../../../modules/game/@types/BoardState'
  import GridScore from './GridScore.svelte'

  // define props
  let extendedClass: string = ""
  let player: 'a' | 'b'
  let currentActor: string
  let boardState: BoardState
  let score: { a: number, b: number }
  let onPlaceBlock: (player: string, dice: DiceFace, column: number) => void
  export {
    extendedClass as class,
    player,
    boardState,
    currentActor,
    onPlaceBlock,
    score
  }


  const diceFace = tweened<DiceFace>(rollTheDice(), {
    duration: 300,
    interpolate: (a, b) => t => rollTheDice(),
  })

  // new roll when it's your turn
  $: {
    if (currentActor === player)
      $diceFace = rollTheDice()
  }

  let playerStandByClass = player === 'a' ? 'bg-yellow-700 border-yellow-500' : 'bg-blue-800 border-blue-500'
</script>

<section class="flex space-x-4 items-start justify-center relative {extendedClass}">
  <div class="absolute left-0 bottom-0 space-y-4">
    <h1 class="font-bold text-xl italic">Player {player.toUpperCase()}</h1>
    <!-- Stand by dice -->
    <section
      class="border-[8px] rounded-md h-32 w-56 relative flex justify-end items-end {playerStandByClass}"
    >
      {#if currentActor === player}
        <div
          class="mr-4 mb-1"
          in:fly={{
            x: -100,
            y: -60,
            easing: cubicInOut,
            duration: 400
          }}
        >
          <Dice face={$diceFace} />
        </div>
      {/if}
    </section>

    <!-- Score board -->
    <section>
      <h1 class="font-semibold italic">Score</h1>
      <table class="table-auto text-sm">
        <tr>
          <td>You:</td>
          <td class="pl-3 font-medium">{score[player]}</td>
        </tr>
        <tr>
          <td>Opponent:</td>
          <td class="pl-3 font-medium">{player === 'a' ? score['b'] : score['a']}</td>
        </tr>
      </table>
    </section>
  </div>
  <div class="w-96 max-w-sm space-y-3 mb-4">
    <GridScore
      scoreColumn1={getRowScore(boardState.column1)}
      scoreColumn2={getRowScore(boardState.column2)}
      scoreColumn3={getRowScore(boardState.column3)}
    />
    <div class="bg-gray-100 grid gap-4 p-4 game-board rounded-2xl">
      <!-- Column 1 -->
      <BoardRow
        column={1}
        states={boardState.column1}
        disabled={currentActor !== player}
        onClick={(column) => onPlaceBlock(player, $diceFace, column)}
      />
      <!-- Column 2 -->
      <BoardRow
        column={2}
        states={boardState.column2}
        disabled={currentActor !== player}
        onClick={(column) => onPlaceBlock(player, $diceFace, column)}
      />
      <!-- Column 3 -->
      <BoardRow
        column={3}
        states={boardState.column3}
        disabled={currentActor !== player}
        onClick={(column) => onPlaceBlock(player, $diceFace, column)}
      />
    </div>
  </div>
  <div />
</section>
