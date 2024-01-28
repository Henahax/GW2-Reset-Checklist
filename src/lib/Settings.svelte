<script>
  import SettingsCategory from "./SettingsCategory.svelte";
  import data from "../assets/data.json";

  let visible = false;

  function show() {
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

  <dialog id="settings" class="absolute border rounded-xl border-neutral-500">
    <div class="inline-flex text-left font-bold text-lg justify-between w-full px-3 py-1">
      Displayed items
      <button class="text-2xl hover:scale-110" on:click={show}>
        <i class="fa-solid fa-xmark self-center" />
      </button>
    </div>
    <div class="settingsContainer px-2">
      {#each data as category}
        <SettingsCategory {category} />
      {/each}
    </div>
    <div class="inline-flex w-full">
      <button
        class="rounded-full bg-neutral-800 py-1 px-6 mx-auto my-4 border border-neutral-500 hover:scale-110"
        on:click={show}>Ok</button
      >
    </div>
  </dialog>
</div>

<style>
  .settingsContainer {
    columns: 3 16rem;
  }

  dialog:modal{
    height: fit-content;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  }
</style>
