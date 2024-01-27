<script lang="ts">
  import EventTimer from "./EventTimer.svelte";
  import type { Item } from "../types";
  import { getCookieValue } from "../functions";
  import { setCookie } from "../functions";
  export let item: Item;

  let displayed = getDisplayed();

  function getDisplayed() {
    let displayed = getCookieValue(item.id + ".displayed");
    if (displayed === null) {
      if (item.default) {
        return true;
      }
      return false;
    }
    return displayed;
  }

  function getChecked() {
    let checked = getCookieValue(item.id + ".checked");
    if (checked === null) {
      return false;
    }
    return checked;
  }

  function setChecked(event) {
    setCookie(item, ".checked", event.target.checked);
  }
</script>

<li class="inline-flex py-1 justify-between gap-2" class:hidden={displayed}>
  <label class="inline-flex items-center gap-4 w-full">
    <input
      type="checkbox"
      class="w-6 h-6 shrink-0"
      checked={getChecked()}
      on:click={setChecked}
    />
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
        <div class="tooltip-container">
          <i
            class="fa-regular fa-clock self-center"
            aria-describedby={item.id + "Tooltip"}
          >
            <div
              id={item.id + "Tooltip"}
              class="tooltip whitespace-nowrap absolute z-10 bg-black text-white rounded-full px-2 py-1 border border-neutral-600 opacity-80 -ml-14"
            >
              resets daily
            </div>
          </i>
        </div>
      {/if}
      {#if item.interval == "weekly"}
        <div class="tooltip-container">
          <i class="fa-regular fa-calendar">
            <div
              id={item.id + "Tooltip"}
              class="tooltip whitespace-nowrap absolute z-10 bg-red-500 text-white rounded-full px-2 py-1 border border-neutral-600 opacity-80 -ml-14"
            >
              resets weekly
            </div>
          </i>
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

  :global(li:has(input:checked) .eventTimer) {
    @apply hidden;
  }

  .tooltip {
    display: none;
  }

  .tooltip-container:hover .tooltip {
    display: block;
  }
</style>
