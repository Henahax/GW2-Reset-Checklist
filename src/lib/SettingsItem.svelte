<script lang="ts">
  import type { Item } from "../types";
  export let item: Item;
</script>

<li class="flex items-center">
    <input type="checkbox" class="w-6 h-6 m-1"/>
    <img class="w-8 m-1" src={item.icon} alt={item.name}/>
    {item.name}
</li>

<style>
</style>
