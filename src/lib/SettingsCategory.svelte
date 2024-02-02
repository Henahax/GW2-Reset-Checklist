<script lang="ts">
  import SettingsItem from "./SettingsItem.svelte";
  import type { Category } from "../types";

  export let category: Category;
</script>

<div class="break-inside-avoid pb-4">
  <div class="mx-1">{category.name}</div>
  <ul>
    {#each category.tasks.sort( (a, b) => a.interval.localeCompare(b.interval) ) as item}
      <SettingsItem {item} />
    {/each}
  </ul>
</div>
