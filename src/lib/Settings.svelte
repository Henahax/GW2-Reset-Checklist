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
      document.getElementById("settings").show();
    }
  }
</script>

<div>
  <button class="text-2xl" on:click={show}>
    <i class="fa-solid fa-gear self-center" />
  </button>
</div>
<dialog
  id="settings"
  class="settings absolute right-0 top-0 rounded-xl border bg-neutral-900 border-neutral-500 w-fit"
>
  <div class="inline-flex text-left font-bold text-lg justify-between w-full">
    Displayed items
    <button class="text-2xl" on:click={show}>
      <i class="fa-solid fa-gear self-center" />
    </button>
  </div>
  <div class="settingsContainer px-2">
    {#each data as category}
      <SettingsCategory {category} />
    {/each}
  </div>
  <div class="inline-flex w-full">
    <button
      class="rounded-full bg-neutral-800 px-4 mx-auto my-2 border border-neutral-500"
      on:click={show}>Ok</button
    >
  </div>
</dialog>

<style>
  .settings {
    max-width: calc(100dvw - 3rem);
  }

  .settingsContainer {
    columns: 3 16rem;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  }
</style>
