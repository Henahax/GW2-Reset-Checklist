<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import type { Category } from "../types";
  import Task from "./Task.svelte";

  export let category: Category;

  let value = "-";
  let closed = false;
  let allDone = false;

  onMount(async () => {
    toggle2();
    tasksDone();
  });

  function toggle() {
    closed = !closed;
    value = closed === true ? "+" : "-";
  }

  function toggle2() {
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
  class="card {category.id} border border-neutral-700 rounded-xl bg-stone-900 break-inside-avoid mb-4"
>
  <button
    on:click={toggle}
    class="flex w-full text-left text-md font-bold justify-between items-center px-3 py-2"
    class:text-sm={allDone}
  >
    {category.name}
    {#key closed}
      <div class="text-center w-3">
        {value}
      </div>
    {/key}
  </button>

  {#key closed}
    <ul
      transition:slide={{ duration: 1000 }}
      class:hidden={closed}
      class="flex flex-col divide-y divide-zinc-800 px-3 pb-1"
    >
      {#each category.tasks.sort( (a, b) => a.interval.localeCompare(b.interval) ) as item}
        <Task {item} on:toggle={toggle2} on:tasksDone={tasksDone} />
      {/each}
    </ul>
  {/key}
</div>

<style>
  .card:not(:has(input[type="checkbox"]:not(:checked))) {
    opacity: 0.5;
  }

  .card:has(ul:empty) {
    @apply hidden;
  }
</style>
