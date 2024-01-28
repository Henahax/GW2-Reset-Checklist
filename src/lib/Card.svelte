<script lang="ts">
  	import { slide } from 'svelte/transition';
  import type { Category } from "../types";
  import Task from "./Task.svelte";

  export let category: Category;

  let value = "-";
  let closed = false;

  function toggle() {
    closed = !closed;
    value = closed === true ? "+" : "-";
  }

  function toggle2(){
    var selector = "." + category.id + ":not(:has(input[type='checkbox']:not(:checked)))";
    if(document.querySelectorAll(selector).length > 0){
      toggle();
    }
  }
</script>

<div
  class="card {category.id} border border-neutral-700 rounded-xl px-4 py-2 bg-stone-900 break-inside-avoid mb-4"
  on:load={toggle2}
  >
  <button
    on:click={toggle}
    class="flex w-full text-left text-md font-bold justify-between items-center"
  >
    {category.name}
    <div class="text-center w-3">{value}</div>
  </button>

  <ul transition:slide
  class="class flex flex-col divide-y divide-zinc-800 overflow-y-hidden"
  class:hidden={closed}
  >
    {#each category.tasks as item}
      <Task {item} on:toggle={toggle2} />
    {/each}
  </ul>

</div>

<style>
  .card:not(:has(input[type="checkbox"]:not(:checked))) {
    opacity: 0.5;
  }

  .card:has(ul:empty){
    @apply hidden;
  }


</style>
