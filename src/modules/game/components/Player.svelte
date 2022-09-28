<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  import Dice from '../../player/components/Dice.svelte'
  import { rollTheDice } from '../../game/services/rollTheDice'

  import type { DiceFace } from '../../../core/@types/DiceFace'

  const diceFace = tweened<DiceFace>(rollTheDice(), {
    duration: 300,
    interpolate: (a, b) => t => rollTheDice(),
  })

  let isCreateDice = false
  const onRoll = () => {
    let targetState = !isCreateDice

    if (targetState) $diceFace = rollTheDice()

    isCreateDice = targetState
  }

  $: serializedFace = Math.floor($diceFace) as DiceFace

  let extendedClass: string = ""
  let player: 'a' | 'b'
  export { extendedClass as class, player }

  let playerStandByClass = player === 'a' ? 'bg-yellow-700 border-yellow-500' : 'bg-blue-800 border-blue-500'
</script>

<section class="flex space-x-4 items-start justify-center relative {extendedClass}">
  <div class="absolute left-0 bottom-0 space-y-4">
    <button on:click={onRoll}>Toggle</button>
    <!-- Stand by dice -->
    <section
      class="border-[8px] rounded-md h-32 w-56 relative flex justify-end items-end {playerStandByClass}"
    >
      {#if isCreateDice}
        <div
          class="mr-4 mb-1"
          in:fly={{
            x: -100,
            y: -64,
            easing: cubicInOut,
            duration: 400
          }}
        >
          <Dice face={serializedFace} />
        </div>
      {/if}
    </section>

    <!-- Score board -->
    <section>
      <h1 class="font-semibold italic">Score</h1>
      <table class="table-auto text-sm">
        <tr>
          <td>You:</td>
          <td class="pl-3 font-medium">88</td>
        </tr>
        <tr>
          <td>Opponent:</td>
          <td class="pl-3 font-medium">88</td>
        </tr>
      </table>
    </section>
  </div>
  <div class="w-96 max-w-sm space-y-3 mb-4">
    <div class="grid grid-cols-3 gap-4 justify-center text-center text-xl">
      <h2 class="font-medium text-gray-400 rotate-180">
        11
      </h2>
      <h2 class="font-medium text-gray-400 rotate-180">
        11
      </h2>
      <h2 class="font-medium text-gray-400 rotate-180">
        11
      </h2>

      <h1 class="font-bold">11</h1>
      <h1 class="font-bold">11</h1>
      <h1 class="font-bold">11</h1>
    </div>
    <div class="bg-gray-100 grid gap-4 p-4 game-board rounded-2xl">
      {#each new Array(3).fill(0) as _, first (first)}
        {#each new Array(3).fill(0) as __, last (last)}
          <div
            class="w-full bg-white aspect-square flex justify-center items-center relative"
            style="grid-area: {String.fromCharCode(97 + 3 * first + last)};"
          >
            <span class="absolute font-mono left-0 top-0 text-xs font-semibold text-red-600">{first + 1} - {last + 1}</span>
            <Dice face={serializedFace} />
          </div>
        {/each}
      {/each}
    </div>
  </div>
  <div />
</section>
