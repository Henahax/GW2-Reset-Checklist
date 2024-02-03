<script lang="ts">
  import EventTimer from "./EventTimer.svelte";
  import type { Item } from "../types";
  import { getCookieValue } from "../functions";
  import { setCookie } from "../functions";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  let showInfoTooltip = false;
  let showDailyTooltip = false;
  let showWeeklyTooltip = false;

  function toolTipInfo() {
    showInfoTooltip = !showInfoTooltip;
  }

  function toolTipDaily() {
    showDailyTooltip = !showDailyTooltip;
  }

  function toolTipWeekly() {
    showWeeklyTooltip = !showWeeklyTooltip;
  }

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
    let displayed = getCookieValue("display." + item.id);
    if (displayed === null) {
      if (item.default) {
        return true;
      }
      return false;
    }
    return displayed;
  }

  function getChecked() {
    let checked = getCookieValue("check." + item.id);
    if (checked === null) {
      return false;
    }
    return checked;
  }

  function setChecked(event) {
    checked = event.target.checked;
    setCookie("check." + item.id, checked.toString(), item.interval);
    toggle();
    tasksDone();
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
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a
          on:mouseover={toolTipInfo}
          on:mouseout={toolTipInfo}
          on:focus={toolTipInfo}
          on:blur={toolTipInfo}
          href={item.link}
        >
          <i class="fa-regular fa-circle-question" />
          {#if showInfoTooltip}
            <span
              transition:fade
              class="absolute bg-black opacity-80 text-sm mt-4 -ml-16 border border-neutral-600 rounded-lg py-0.5 px-2 text-nowrap text-white"
              >more info</span
            >
          {/if}
        </a>

        {#if item.interval == "daily"}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            on:mouseover={toolTipDaily}
            on:mouseout={toolTipDaily}
            on:focus={toolTipDaily}
            on:blur={toolTipDaily}
          >
            <i class="fa-regular fa-clock self-center"> </i>
            {#if showDailyTooltip}
              <span
                transition:fade
                class="absolute bg-black opacity-80 text-sm mt-4 -ml-20 border border-neutral-600 rounded-lg py-0.5 px-2 text-nowrap text-white"
                >resets daily</span
              >
            {/if}
          </div>
        {/if}
        {#if item.interval == "weekly"}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            on:mouseover={toolTipWeekly}
            on:mouseout={toolTipWeekly}
            on:focus={toolTipWeekly}
            on:blur={toolTipWeekly}
          >
            <i class="fa-regular fa-calendar"> </i>
            {#if showWeeklyTooltip}
              <span
                transition:fade
                class="absolute bg-black opacity-80 text-sm mt-4 -ml-24 border border-neutral-600 rounded-lg py-0.5 px-2 text-nowrap text-white"
                >resets weekly</span
              >
            {/if}
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
</style>
