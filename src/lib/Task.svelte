<script lang="ts">
  import EventTimer from "./EventTimer.svelte";
  import type { Item } from "../types";
  export let item: Item;
</script>

<li class="inline-flex py-1 justify-between gap-2">
  <label class="inline-flex items-center gap-4 w-full">
    <input type="checkbox" class="w-6 h-6" />
    <img src={item.icon} alt={item.name} class="icon w-8 h-8" />
    <div>
      <h4 class="text-sm">{item.name}</h4>
      <h5 class="text-xs text-neutral-400">{item.info}</h5>
    </div>
  </label>
  <div class="info text-right text-xs text-neutral-400 self-center">
    <div class="inline-flex gap-1.5">
      <a href={item.link}>
        <i class="fa-regular fa-circle-question" />
      </a>
      {#if item.interval == "daily"}
        <div>
          <i class="fa-regular fa-clock self-center" />
        </div>
      {/if}
      {#if item.interval == "weekly"}
        <div>
          <i class="fa-regular fa-calendar" />
        </div>
      {/if}
    </div>
    {#if item.timer}
      <EventTimer timer={item.timer} />
    {/if}
  </div>
</li>

<style>
  li:has(input:checked) {
    @apply line-through;
  }

  li:has(input:checked) input {
    @apply w-5 h-5 ml-1 p-2;
  }

  li:has(input:checked) .icon {
    @apply w-8 h-8 p-1;
  }

  li:has(input:checked) h4 {
    @apply text-xs;
  }

  li:has(input:checked) h5 {
    @apply hidden;
  }

  li:has(input:checked) .info {
    @apply hidden;
  }
</style>
