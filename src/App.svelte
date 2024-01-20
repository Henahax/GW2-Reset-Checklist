<script lang="ts">
  import ResetTimer from "./lib/ResetTimer.svelte";
  import Card from "./lib/Card.svelte";
  import categories from "./assets/categories.json";
</script>

<main class="w-fit m-auto">
  <header class="flex flex-wrap p-2 justify-between w-full">
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
      <button class="text-2xl">
        <i class="fa-solid fa-gear self-center" />
      </button>
    </div>
  </header>
  <div class="test grid gap-4 m-2">
    {#each categories as category}
      <Card {category} />
    {/each}
  </div>
</main>

<style>
</style>
