<script lang="ts">
  import { scale } from 'svelte/transition'

  import Dice from '../../../modules/player/components/Dice.svelte'

  export let isOpen: boolean
</script>

{#if isOpen}
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
        <button on:click={() => (isOpen = false)}>
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
            When dice of the same number are placed in the same column, multiply
            their value.
          </p>
        </div>
        <div>
          <div class="w-48 flex flex-col items-center relative mx-auto">
            <Dice face={6} diceMultiplier={-1} />
            <div class="bg-gray-400 h-0.5 w-20 rounded-full my-2" />
            <Dice face={6} diceMultiplier={-1} />
          </div>
          <p class="mt-4 font-medium text-center">
            Destroy your opponents dice by matching yours to theirs in the same
            column.
          </p>
        </div>
        <div class="col-span-2 mt-2 italic font-medium text-center">
          Score is calculated by adding all your dice together
        </div>
      </div>
    </div>
  </div>
{/if}
