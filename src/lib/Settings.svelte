<script>
  import SettingsCategory from "./SettingsCategory.svelte";
  import categories from "../assets/categories.json";

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
    class="settings absolute mr-4 mt-10 rounded-xl border bg-neutral-800 w-fit"
  >
    <div class="text-left p-2">Displayed items</div>
    <div class="settingsContainer px-2">
      {#each categories as category}
        <SettingsCategory {category} />
      {/each}
    </div>
    <button class="rounded-full bg-neutral-500 px-2" on:click={show}>Ok</button>
  </dialog>
{/if}

<style>
  .settings {
    max-width: calc(100dvw - 3rem);
  }

  .settingsContainer {
    columns: 3 18rem;
  }
</style>
