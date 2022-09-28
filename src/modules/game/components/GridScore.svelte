<script lang="ts">
  export let scoreColumn1: number
  export let scoreColumn2: number
  export let scoreColumn3: number
</script>

<div class="grid grid-cols-3 gap-4 justify-center text-center text-2xl">
  <h2 class="font-medium text-gray-400 rotate-180">
    {scoreColumn1}
  </h2>
  <h2 class="font-medium text-gray-400 rotate-180">
    {scoreColumn2}
  </h2>
  <h2 class="font-medium text-gray-400 rotate-180">
    {scoreColumn3}
  </h2>

  <h1 class="font-bold">{scoreColumn1}</h1>
  <h1 class="font-bold">{scoreColumn2}</h1>
  <h1 class="font-bold">{scoreColumn3}</h1>
</div>
