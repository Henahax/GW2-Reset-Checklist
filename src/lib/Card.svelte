<script lang=ts>
    import Task from "./Task.svelte";
    import items from "../assets/items.json";

    export let category;

    let listVisible = true;
    function toggleList(e){
        listVisible = !listVisible;

        if(listVisible){
            e.currentTarget.nextElementSibling.style.display = "";
        }else{
            e.currentTarget.nextElementSibling.style.display = "none"
        }
    }
</script>

<div class="border border-neutral-700 rounded-xl px-4 py-2">
    <button on:click={toggleList} class="flex w-full text-left text-md font-bold justify-between items-center">
        {category.name}
        <div>
            {listVisible ? "-" : "+"}
        </div>
    </button>
    <ul class="class flex flex-col divide-y divide-neutral-800">
        {#each items.filter(item => item.category.indexOf(category.id) !== -1) as item}
        <Task {item}/>
        {/each}
    </ul>
</div>

<style>
</style>