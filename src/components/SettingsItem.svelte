<script lang="ts">
	import { onMount } from 'svelte';
	export let item: object;

	let checked: boolean | null = null;

	function getChecked(): boolean {
		const cookieValue = getCookieValue('setting' + item.id);
		return cookieValue !== null ? cookieValue : item.default === true;
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
		const now = new Date();
		const expires = now.getTime() + 1000 * 60 * 60 * 24 * 365 * 10;
		now.setTime(expires);

		document.cookie = `setting${item.id}=${getChecked()}; expires=${now.toUTCString()}`;
	}

	onMount(() => {
		checked = getChecked();
	});
</script>

<li class="settingsItem">
	<label class="inline-flex text-neutral-200 hover:brightness-125">
		<input
			id={'setting' + item.id}
			type="checkbox"
			class="m-1 w-6 h-6"
			bind:checked
			on:click={setCookie}
		/>
		<div class="m-1 my-auto">
			<img alt={item.name} src={item.icon} class="w-6 h-6" />
		</div>
		<div class="mx-1 my-auto text-sm">
			<h3>{item.name}</h3>
		</div>
	</label>
</li>
