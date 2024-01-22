<script lang="ts">
    import SettingsItem from "./SettingsItem.svelte";
    import items from "../assets/items.json"
    import type { Category } from "../types";

    export let category:Category;
</script>

<div>
    <div class="text-left">{category.name}</div>
    <ul>
        {#each items.filter(item => item.category.indexOf(category.id) !== -1) as item}
            <SettingsItem {item} />
        {/each}
    </ul>
</div>