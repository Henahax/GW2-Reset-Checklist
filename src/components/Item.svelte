<script lang="ts">
	import { onMount } from 'svelte';
	import EventTimer from './EventTimer.svelte';

	export let item: object;
	let checked = false;

	function getDisplayed(): boolean {
		const cookieValue = getCookieValue('setting' + item.id);
		return cookieValue !== null ? cookieValue : item.default === true;
	}

	function getChecked(): boolean {
		const cookieValue = getCookieValue(item.id);
		return cookieValue !== null ? cookieValue : false;
	}

	function getCookieValue(cookieName: string): boolean | null {
		const cookies = document.cookie.split('; ');

		for (const cookie of cookies) {
			const [name, value] = cookie.split('=');

			if (name === cookieName) {
				return value === 'true' ? true : value === 'false' ? false : null;
			}
		}

		return null;
	}

	function setCookie(event) {
		let time = new Date();
		if (item.interval === 'daily') {
			time = getUTCTimeForStartOfNextDay();
		}
		if (item.interval === 'weekly') {
			time = getUTCTimeForStartOfNextWeek();
		}

		document.cookie = `${item.id}=${event.target.checked}; expires=${time.toUTCString()}`;
	}

	function getUTCTimeForStartOfNextDay() {
		const now = new Date();
		const tomorrow = new Date(now);
		tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
		tomorrow.setUTCHours(0, 0, 0, 0);

		return tomorrow;
	}

	function getUTCTimeForStartOfNextWeek() {
		const now = new Date();
		var nextMonday = new Date();

		while (nextMonday.getUTCDay() !== 1) {
			nextMonday.setUTCDate(nextMonday.getUTCDate() + 1);
		}

		nextMonday.setHours(7, 30, 0, 0);
		if (nextMonday < now) {
			nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);
		}
		return nextMonday;
	}

	onMount(() => {
		checked = getChecked();
	});
</script>

{#if getDisplayed()}
	<li class="inline-flex py-2 mx-2">
		<label
			class="inline-flex w-full text-neutral-100 transition duration-500 ease-in-out hover:brightness-125"
		>
			<input
				id={item.id}
				type="checkbox"
				class="my-auto w-6 h-6 shrink-0"
				{checked}
				on:click={setCookie}
			/>
			<div class="mx-4 my-auto shrink-0">
				<img alt={item.name} src={item.icon} class="w-8 h-8" />
			</div>

			<div class="my-auto">
				<div class="itemName text-sm">{item.name}</div>
				<div class="itemInfo text-neutral-400 text-xs">{item.info}</div>
			</div>
		</label>
		<div class="my-auto shrink-0 grid text-sm">
			<div class="inline-flex text-neutral-400 gap-2 justify-end">
				{#if item.link}
					<a href={item.link}>
						<i
							class="fa-regular fa-circle-question transition duration-500 ease-in-out hover:brightness-150 has-tooltip"
						>
							<span class="tooltip">more info</span>
						</i>
					</a>
				{/if}
				{#if item.interval === 'weekly'}
					<div>
						<i
							class="fa-regular fa-calendar transition duration-500 ease-in-out hover:brightness-150 has-tooltip"
						>
							<span class="tooltip">resets weekly</span>
						</i>
					</div>
				{/if}
				{#if item.interval === 'daily'}
					<div>
						<i
							class="fa-regular fa-clock transition duration-500 ease-in-out hover:brightness-150 has-tooltip"
						>
							<span class="tooltip">resets daily</span>
						</i>
					</div>
				{/if}
			</div>
			{#if item.timer}
				<EventTimer client:only="svelte" timer={item.timer} />
			{/if}
		</div>
	</li>
{/if}

<style>
	li:has(input[type='checkbox']:checked) {
		@apply line-through	opacity-50;
	}

	li:has(input[type='checkbox']:checked) img {
		@apply mx-1 h-6 w-6;
	}

	li:has(input[type='checkbox']:checked) input[type='checkbox'] {
		@apply mx-1 h-4 w-4;
	}

	li:has(input[type='checkbox']:checked) .itemName {
		@apply text-xs leading-none;
	}

	li:has(input[type='checkbox']:checked) .itemInfo {
		@apply hidden;
	}
</style>
