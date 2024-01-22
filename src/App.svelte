<script lang="ts">
  import ResetTimer from "./lib/ResetTimer.svelte";
  import Card from "./lib/Card.svelte";
  import categories from "./assets/categories.json";
  import SettingsMenu from "./lib/SettingsMenu.svelte";
</script>

<main class="w-fit m-auto">
  <header class="flex flex-wrap p-4 justify-between w-full">
    <div>
      <h1 class="text-2xl">Guild Wars 2 Reset Checklist</h1>
      <h2 class="text-xs">Timegated tasks without an ingame tracking system</h2>
    </div>
    <div class="inline-flex text-right text-xs gap-2 h-fit ml-auto mr-0 py-2">
      <div>
        <div>Daily:</div>
        <ResetTimer mode={1} />
      </div>
      <div>
        <div>Weekly:</div>
        <ResetTimer mode={2} />
      </div>
      <SettingsMenu/>
    </div>
  </header>
  <div class="columns-1 lg:columns-2 2xl:columns-3 4xl:columns-4 gap-4 px-4">
    {#each categories as category}
      <Card {category} />
    {/each}
  </div>
  <footer class="p-4 text-center text-sm text-neutral-400">
    © henahax.de 2024
  </footer>
</main>

<style>
</style>
