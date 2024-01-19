<script lang="ts">
  import Task from "./Task.svelte";
  import items from "../assets/items.json";

  export let category;

  let listVisible = true;
  function toggleList(e) {
    listVisible = !listVisible;

    if (listVisible) {
      e.currentTarget.nextElementSibling.style.height = "auto";
    } else {
      e.currentTarget.nextElementSibling.style.height = "0";
    }
  }
</script>

<div class="border border-neutral-700 rounded-xl px-4 py-2 bg-stone-900 h-fit">
  <button
    on:click={toggleList}
    class="flex w-full text-left text-md font-bold justify-between items-center"
  >
    {category.name}
    <div class="text-center w-3">
      {listVisible ? "–" : "+"}
    </div>
  </button>
  <ul class="class flex flex-col divide-y divide-zinc-800 overflow-hidden">
    {#each items.filter((item) => item.category.indexOf(category.id) !== -1) as item}
      <Task {item} />
    {/each}
  </ul>
</div>

<style>
</style>
