<script lang="ts">
  import { scale } from 'svelte/transition'

  import type { DiceFace } from '../../../core/@types/DiceFace'

  export let face: DiceFace
  export let diceMultiplier = 1

  $: rederedDots = [
    [4, 5, 6].includes(face),
    false,
    [2, 3, 4, 5, 6].includes(face),
    face === 6,
    [1, 3, 5].includes(face),
    face === 6,
    [2, 3, 4, 5, 6].includes(face),
    false,
    [4, 5, 6].includes(face),
  ]

  let coloredClass =
    diceMultiplier === 1
      ? 'bg-white border-t-gray-300 border-r-gray-400 border-l-gray-500 border-b-gray-600'
      : diceMultiplier === 2
      ? 'bg-amber-300 border-t-amber-200 border-r-amber-400 border-l-amber-500 border-b-amber-600'
      : diceMultiplier === -1
      ? 'bg-rose-300 border-t-rose-200 border-r-rose-400 border-l-rose-500 border-b-rose-600'
      : 'bg-cyan-300 border-t-cyan-200 border-r-cyan-400 border-l-cyan-500 border-b-cyan-600'
</script>

<div
  class="w-16 h-16 border-[6px] rounded-lg grid grid-cols-3 justify-center items-center p-1 {coloredClass}"
  out:scale
>
  {#each rederedDots as dot}
    {#if dot}
      <div class="bg-gray-900 rounded-full w-2 aspect-square mx-auto" />
    {:else}
      <div />
    {/if}
  {/each}
</div>
