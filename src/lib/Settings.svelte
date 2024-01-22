<script>
  import SettingsCategory from "./SettingsCategory.svelte";
  import data from "../assets/data.json";

  let visible = false;

  function show() {
    visible = !visible;
    if (!visible) {
      location.reload();
    }
  }
</script>

<button class="text-2xl" on:click={show}>
  <i class="fa-solid fa-gear self-center" />
</button>
{#if visible}
  <dialog
    open
    class="settings absolute mr-4 mt-10 rounded-xl border bg-neutral-900 border-neutral-500 w-fit"
  >
    <div class="text-left p-2 mx-1 font-bold text-lg">Displayed items</div>
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
{/if}

<style>
  .settings {
    max-width: calc(100dvw - 3rem);
  }

  .settingsContainer {
    columns: 3 16rem;
  }
</style>
