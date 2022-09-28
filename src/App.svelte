<script lang="ts">
  import Player from './modules/game/components/Player.svelte'
</script>

<main class="h-full p-8 flex flex-col justify-between">
  <Player class="rotate-180" player="b" />
  <Player player="a" />
</main>
