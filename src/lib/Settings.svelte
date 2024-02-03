<script>
  import SettingsCategory from "./SettingsCategory.svelte";
  import data from "../assets/data.json";
  import {setCookie2, getCookieValue} from "../functions";

  let revisit = false;
  if(getCookieValue("revisit") === true){
    revisit = true;
  }

  let visible = false;

  function show() {
    setCookie2("revisit", true.toString());
    visible = !visible;
    if (!visible) {
      document.getElementById("settings").close();
      location.reload();
    } else {
      document.getElementById("settings").showModal();
    }
  }
</script>

<div>
  <button class="text-2xl hover:scale-110" on:click={show}>
    <i class="fa-solid fa-gear self-center" />
  </button>

  {#if !revisit}
  <div class="absolute animate-[bounce_4s_infinite] flex justify-between p-4 items-center z-10 h-16 w-56 -ml-48 mt-4 rounded-lg border border-neutral-600 bg-neutral-800">select displayed items<i class="fa-solid fa-arrow-turn-up"></i></div>
  {/if}

  <dialog id="settings" class="border rounded-xl border-neutral-500">
    <div
      id="top"
      class="inline-flex text-left font-bold text-lg justify-between w-full px-3 py-1"
    >
      Displayed items
      <button class="text-2xl hover:scale-110" on:click={show}>
        <i class="fa-solid fa-xmark self-center" />
      </button>
    </div>
    <div id="settingsContainer" class="flex flex-col">
      <div id="settingItemsContainer" class="px-2 overflow-y-auto overflow-x-hidden">
        {#each data as category}
          <SettingsCategory {category} />
        {/each}
      </div>
    </div>
    <div id="bottom" class="inline-flex w-full">
      <button
        class="rounded-full bg-neutral-800 py-1 px-6 mx-auto my-4 border border-neutral-500 hover:scale-110"
        on:click={show}>Ok</button
      >
    </div>
  </dialog>
</div>

<style>
  #settingsContainer {
    height: calc(100dvh - 10rem);
  }
  #settingItemsContainer {
    columns: 3 16rem;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
</style>
