<script lang="ts">
  import { tweened } from 'svelte/motion'

  import BoardRow from './BoardRow.svelte'
  import GridScore from './GridScore.svelte'
  import HowToPlay from './HowToPlay.svelte'
  import StandbyDeck from './StandbyDeck.svelte'

  import { rollTheDice } from '../../game/services/rollTheDice'
  import { getRowScore } from '../services/getRowScore'

  import type { DiceFace } from '../../../core/@types/DiceFace'
  import type { BoardState } from '../../../modules/game/@types/BoardState'

  // define props
  let extendedClass: string = ''
  export let player: 'a' | 'b'
  export let currentActor: string
  export let boardState: BoardState
  export let score: { a: number; b: number }
  export let isGameEnded: boolean
  export let onPlaceBlock: (
    player: string,
    dice: DiceFace,
    column: number
  ) => void
  export { extendedClass as class }

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

  $: console.log(isHelpOpen)
</script>

<section class="flex items-start justify-center relative {extendedClass}">
  <HowToPlay bind:isOpen={isHelpOpen} />

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
    <StandbyDeck {player} {currentActor} diceFace={$diceFace} />

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
