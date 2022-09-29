<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { fly, scale, fade } from 'svelte/transition'

  import BoardRow from './BoardRow.svelte'
  import Dice from '../../player/components/Dice.svelte'

  import { rollTheDice } from '../../game/services/rollTheDice'
  import { getRowScore } from '../services/getRowScore'

  import type { DiceFace } from '../../../core/@types/DiceFace'
  import type { BoardState } from '../../../modules/game/@types/BoardState'
  import GridScore from './GridScore.svelte'

  // define props
  let extendedClass: string = ''
  export let player: 'a' | 'b'
  export let currentActor: string
  export let boardState: BoardState
  export let score: { a: number; b: number }
  export let isGameEnded: boolean
  export let onPlaceBlock: (player: string, dice: DiceFace, column: number) => void
  export {
    extendedClass as class,
  }

  // define state
  let isHelpOpen = false

  const diceFace = tweened<DiceFace>(rollTheDice(), {
    duration: 300,
    interpolate: (a, b) => t => rollTheDice(),
  })

  // new roll when it's your turn
  $: {
    if (currentActor === player) $diceFace = rollTheDice()
  }

  let playerStandByClass =
    player === 'a'
      ? 'bg-yellow-700 border-yellow-500'
      : 'bg-blue-800 border-blue-500'
</script>

<section
  class="flex space-x-4 items-start justify-center relative {extendedClass}"
>
  {#if isHelpOpen}
    <div
      class="z-50 absolute w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
      in:scale
      out:scale
    >
      <div
        class="bg-white w-2/3  mx-auto shadow-2xl z-50 rounded-xl overflow-hidden"
      >
        <div
          class="bg-gray-100 py-5 px-8 text-2xl font-extrabold text-gray-900 flex justify-between"
        >
          <h1>How to play</h1>
          <button on:click={() => (isHelpOpen = false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 p-6 gap-6">
          <div>
            <div class="w-48 relative mx-auto">
              <Dice face={6} diceMultiplier={2} />
              <div class="flex justify-end">
                <Dice face={6} diceMultiplier={2} />
              </div>
            </div>
            <p class="mt-4 font-medium text-center">
              When dice of the same number are placed in the same column,
              multiply their value.
            </p>
          </div>
          <div>
            <div class="w-48 flex flex-col items-center relative mx-auto">
              <Dice face={6} diceMultiplier={-1} />
              <div class="bg-gray-400 h-0.5 w-20 rounded-full my-2" />
              <Dice face={6} diceMultiplier={-1} />
            </div>
            <p class="mt-4 font-medium text-center">
              Destroy your opponents dice by matching yours to theirs in the
              same column.
            </p>
          </div>
          <div class="col-span-2 mt-2 italic font-medium text-center">
            Score is calculated by adding all your dice together
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="absolute left-0 bottom-0 space-y-4">
    <button
      class="inline-flex items-center text-gray-600 font-medium text-sm"
      on:click={() => (isHelpOpen = true)}
    >
      How to play
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5 ml-0.5"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <h1 class="font-bold text-xl italic">
      Player {player.toUpperCase()}
      <span class="text-gray-600 text-base"
        >(Rank: {(score.a - score.b) * (player === 'b' ? -1 : 1) < 0
          ? '2nd'
          : '1st'})</span
      >
    </h1>
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
            duration: 400,
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
          <td class="pl-3 font-medium"
            >{player === 'a' ? score['b'] : score['a']}</td
          >
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
        disabled={currentActor !== player || isGameEnded}
        onClick={column => onPlaceBlock(player, $diceFace, column)}
      />
      <!-- Column 2 -->
      <BoardRow
        column={2}
        states={boardState.column2}
        disabled={currentActor !== player || isGameEnded}
        onClick={column => onPlaceBlock(player, $diceFace, column)}
      />
      <!-- Column 3 -->
      <BoardRow
        column={3}
        states={boardState.column3}
        disabled={currentActor !== player || isGameEnded}
        onClick={column => onPlaceBlock(player, $diceFace, column)}
      />
    </div>
  </div>
  <div />
</section>
