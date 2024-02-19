<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import type { Category } from "../types";
  import Task from "./Task.svelte";

  export let category: Category;

  let closed = false;
  let allDone = false;

  onMount(async () => {
    toggleAuto();
    tasksDone();
  });

  function toggle() {
    closed = !closed;
  }

  function toggleAuto() {
    if (
      document.querySelectorAll(
        "." + category.id + ":not(:has(input[type='checkbox']:not(:checked)))"
      ).length > 0
    ) {
      toggle();
    }
  }

  function tasksDone() {
    allDone =
      document.querySelectorAll(
        "." + category.id + ":not(:has(input[type='checkbox']:not(:checked)))"
      ).length > 0;
  }
</script>

<div
  class="card {category.id} rounded-xl bg-stone-900 break-inside-avoid mb-4 border border-stone-800"
>
  <button
    on:click={toggle}
    class="flex w-full text-left text-md font-bold justify-between items-center px-3 py-2"
    class:text-sm={allDone}
  >
    {category.name}
    <div class="text-center w-3 text-xs">
      {#if closed}
        <i class="fa-solid fa-plus"></i>
      {:else}
        <i class="fa-solid fa-minus"></i>
      {/if}
    </div>
  </button>

  {#key closed}
    <ul
      transition:slide={{ duration: 1000 }}
      class:hidden={closed}
      class="flex flex-col divide-y divide-stone-800 px-3 pb-1"
    >
      {#each category.tasks.sort( (a, b) => a.interval.localeCompare(b.interval) ) as item}
        <Task {item} on:toggle={toggleAuto} on:tasksDone={tasksDone} />
      {/each}
    </ul>
  {/key}
</div>

<style>
  .card:not(:has(input[type="checkbox"]:not(:checked))) {
    @apply opacity-50;
  }

  .card:has(ul:empty) {
    @apply invisible;
  }
</style>
