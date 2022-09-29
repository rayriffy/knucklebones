<script lang="ts">
  import { cubicInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  import Dice from '../../../modules/player/components/Dice.svelte'

  import type { DiceFace } from '../../../core/@types/DiceFace'

  export let player: 'a' | 'b'
  export let currentActor: string
  export let diceFace: DiceFace

  let playerStandByClass =
    player === 'a'
      ? 'bg-yellow-700 border-yellow-500'
      : 'bg-blue-800 border-blue-500'
</script>

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
      <Dice face={diceFace} />
    </div>
  {/if}
</section>
