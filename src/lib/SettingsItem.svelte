<script lang="ts">
  import type { Item } from "../types";
  import { getCookieValue } from "../functions";
  import { setCookie } from "../functions";
  export let item: Item;

  function getChecked() {
    let checked = getCookieValue(item.id + ".displayed");
    if (checked === null) {
      if (item.default === true) {
        return true;
      }
      return false;
    }
    return checked;
  }

  function setChecked(event) {
    setCookie(item, ".displayed", event.target.checked);
  }
</script>

<li class="flex items-center">
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      class="w-6 h-6 m-1 shrink-0"
      checked={getChecked()}
      on:click={setChecked}
    />
    <img class="w-6 m-1" src={item.icon} alt={item.name} />
    <div class="text-wrap text-sm">{item.name}</div>
  </label>
</li>

<style>
</style>
