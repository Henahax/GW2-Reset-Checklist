<script lang="ts">
  import ResetTimer from "./lib/ResetTimer.svelte";
  import Settings from "./lib/Settings.svelte";
  import Card from "./lib/Card.svelte";
  import data from "./assets/data.json";
</script>

<main class="m-auto w-full max-w-screen-2xl flex flex-col h-svh">
  <header class="inline-flex justify-between w-full gap-4 px-4 py-4">
    <div class="text-wrap">
      <h1 class="text-2xl">
        <nobr>Guild Wars 2</nobr> <nobr>Reset Checklist</nobr>
      </h1>
      <h2 class="text-xs">Timegated tasks without an ingame tracking system</h2>
    </div>
    <div class="inline-flex gap-4 items-center">
      <div
        class="flex text-right text-sm flex-wrap gap-2 items-end justify-end"
      >
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
  <div class="categories gap-4 px-2">
    {#each data as category}
      <Card {category} />
    {/each}
  </div>
  <footer class="p-8 text-center text-xs text-neutral-400 mt-auto">
    © henahax.de 2024
  </footer>
</main>

<style>
  .categories {
    columns: 3 24rem;
    column-fill: balance;
  }
</style>
