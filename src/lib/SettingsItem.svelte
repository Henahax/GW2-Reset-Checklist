<script lang="ts">
  import type { Item } from "../types";
  export let item: Item;
</script>

<li class="flex items-center">
  <label class="inline-flex items-center">
    <input type="checkbox" class="w-6 h-6 m-1 shrink-0" />
  <img class="w-6 m-1" src={item.icon} alt={item.name} />
  <div class="text-wrap text-sm">{item.name}</div>
  </label>
</li>

<style>
</style>
