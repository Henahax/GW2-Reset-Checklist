<script>
  import SettingsCategory from "./SettingsCategory.svelte";
  import categories from "../assets/categories.json";

  let visible = false;

  function show(){
    visible = !visible;
    if(!visible){
      location.reload();
    }
  }
</script>

<button class="text-2xl" on:click={show}>
  <i class="fa-solid fa-gear self-center" />
</button>
{#if visible}
<dialog open class="absolute mt-8 rounded-xl border bg-neutral-800 w-fit">
  <div class="text-right">Displayed items</div>
  <div class="flex flex-col gap-2">
    {#each categories as category}
      <SettingsCategory {category}/>
    {/each}
  </div>
  <button class="rounded-full bg-neutral-500 px-2" on:click={show}>Ok</button>
</dialog>
{/if}

<style>
</style>
