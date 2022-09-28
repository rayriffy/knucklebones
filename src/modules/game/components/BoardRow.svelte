<script lang="ts">
  import Dice from "../../../modules/player/components/Dice.svelte"
  import type { DiceFace } from "../../../core/@types/DiceFace"

  export let column: number
  export let states: (DiceFace | null)[]

  export let disabled: boolean
  export let onClick: (column: number) => void

  $: countedDices = states.reduce((acc, val) => {
    if (val !== null) acc[val] = (acc[val] ?? 0) + 1

    return acc
  }, {})
</script>

{#each states as item, index (`column${column}-row${index}-val${item ?? 0}mul${countedDices[item] ?? 1}`)}
  <button
    class="w-full bg-white aspect-square flex justify-center items-center" disabled={disabled} on:click={() => onClick(column)}
    style="grid-area: {String.fromCharCode(97 + 3 * (column - 1) + index)};"
  >
    {#if item !== null}
      <Dice face={item} diceMultiplier={countedDices[item] ?? 1} />
    {/if}
  </button>
{/each}

