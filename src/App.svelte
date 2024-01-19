<script lang="ts">
  import Card from "./lib/Card.svelte";
  import categories from "./assets/categories.json";
</script>

<header>
  <div>
    <h1 class="text-3xl">GW2 Reset Checklist</h1>
    <h2>todo</h2>
  </div>
  <div>
    <div>

    </div>
    <button>Settings</button>
  </div>
</header>
<main>
  <div class="grid gap-4">
    {#each categories as category }
      <Card {category}/>
    {/each}
  </div>
</main>

<style>
</style>
