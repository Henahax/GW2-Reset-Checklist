<script lang="ts">
  import { slide } from "svelte/transition";
  import { scale } from "svelte/transition";
  import Task from "./Task.svelte";
  import items from "../assets/items.json";

  export let category;

  let visible = true;
  function toggle() {
    visible = !visible;
  }
</script>

<div class="border border-neutral-700 rounded-xl px-4 py-2 bg-stone-900 break-inside-avoid mb-4">
  <button
    on:click={toggle}
    class="flex w-full text-left text-md font-bold justify-between items-center"
  >
    {category.name}
    {#if visible}
      <div class="text-center w-3" in:scale>–</div>
    {:else}
      <div class="text-center w-3" in:scale>+</div>
    {/if}
  </button>
  {#if visible}
    <ul
      transition:slide
      class="class flex flex-col divide-y divide-zinc-800 overflow-y-hidden"
    >
      {#each items.filter((item) => item.category.indexOf(category.id) !== -1) as item}
        <Task {item} />
      {/each}
    </ul>
  {/if}
</div>

<style>
</style>
