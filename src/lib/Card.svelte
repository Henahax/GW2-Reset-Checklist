<script lang="ts">
  import type { Category } from "../types";
  import Task from "./Task.svelte";

  export let category: Category;

  let value = "-";
  let closed = false;

  function toggle() {
    closed = !closed;
    value = closed === true ? "-" : "+";
  }
</script>

<div
  class="card border border-neutral-700 rounded-xl px-4 py-2 bg-stone-900 break-inside-avoid mb-4"
>
  <button
    on:click={toggle}
    class="flex w-full text-left text-md font-bold justify-between items-center"
  >
    {category.name}
    <div class="text-center w-3">{value}</div>
  </button>
  <ul class="class flex flex-col divide-y divide-zinc-800 overflow-y-hidden">
    {#each category.tasks as item}
      <Task {item} />
    {/each}
  </ul>
</div>

<style>
  .card:not(:has(input[type="checkbox"]:not(:checked))) {
    text-decoration: line-through;
    opacity: 0.5;
  }

  :global(.card > ul > li.hidden:not(:not(.hidden)).card) {
    display: none;
  }
</style>
