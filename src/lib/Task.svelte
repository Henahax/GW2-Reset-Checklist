<script lang="ts">
  import EventTimer from "./EventTimer.svelte";
  import type { Item } from "../types";
  import { getCookieValue } from "../functions";
  import { setCookie } from "../functions";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
  function toggle() {
    dispatch("toggle");
  }

  function tasksDone() {
    dispatch("tasksDone");
  }

  export let item: Item;

  let displayed = getDisplayed();
  let checked = getChecked();

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
    toggle();
    tasksDone();
    setCookie(item, ".checked", event.target.checked);
    checked = event.target.checked;
  }
</script>

{#if displayed}
  <li class="inline-flex py-1 justify-between gap-2">
    <label class="inline-flex items-center gap-4 w-full">
      <input
        type="checkbox"
        class="w-6 h-6 shrink-0"
        {checked}
        on:click={setChecked}
      />
      <img src={item.icon} alt={item.name} class="icon w-8 h-8" />
      <div>
        <h4 class="text-sm">{item.name}</h4>
        {#if !checked}
          <h5
            class="text-xs text-neutral-400"
            transition:fade={{ duration: 250 }}
          >
            {item.info}
          </h5>
        {/if}
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
      {#if !checked && item.timer}
        <EventTimer timer={item.timer} />
      {/if}
    </div>
  </li>
{/if}

<style>
  li:has(input:checked) {
    @apply line-through opacity-50;
  }

  li:has(input:checked) input {
    @apply w-5 h-5 mx-0.5 p-2;
  }

  li:has(input:checked) .icon {
    @apply w-8 h-8 p-1;
  }

  li:has(input:checked) h4 {
    @apply text-xs;
  }

  .tooltip {
    display: none;
  }

  .tooltip-container:hover .tooltip {
    display: block;
  }
</style>
