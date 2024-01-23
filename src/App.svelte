<script lang="ts">
  import ResetTimer from "./lib/ResetTimer.svelte";
  import Settings from "./lib/Settings.svelte";
  import Card from "./lib/Card.svelte";
  import data from "./assets/data.json";
</script>

<main class="w-fit m-auto">
  <header class="inline-flex p-4 justify-between w-full gap-4">
    <div class="text-wrap">
      <h1 class="text-2xl">Guild Wars 2 Reset Checklist</h1>
      <h2 class="text-xs">Timegated tasks without an ingame tracking system</h2>
    </div>
    <div class="inline-flex gap-4">
      <div class="flex text-right text-sm flex-wrap gap-2 items-end justify-end">
        <div>
          <div>Daily:</div>
          <ResetTimer mode={1} />
        </div>
        <div>
          <div>Weekly:</div>
          <ResetTimer mode={2} />
        </div>
      </div>
    <Settings />
  </div>

  </header>
  <div class="categories gap-4 px-4">
    {#each data as category}
      <Card {category} />
    {/each}
  </div>
  <footer class="p-4 text-center text-sm text-neutral-400">
    © henahax.de 2024
  </footer>
</main>

<style>
  .categories {
    columns: 3 24rem;
  }
</style>
