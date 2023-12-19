<script lang="ts">
	import { onDestroy } from 'svelte'
	export let timer: object

	let nextEventTime: [Date, object, string]
	let targetTime: Date
	let active = false
	let soon = false
	let duration: [number, number]
	let add: string
	let timeRemaining = calculateTimeRemaining()

	interface TimeRemaining {
		days: number
		hours: number
		minutes: number
		seconds: number
	}

	function calculateTimeRemaining(): TimeRemaining {
		nextEventTime = getNextEventTime(timer)
		targetTime = nextEventTime[0]
		duration = [
			timer.duration[0].toString().padStart(2, '0'),
			timer.duration[1].toString().padStart(2, '0')
		]
		add = nextEventTime[2]

		const now = new Date().getTime()
		const isCountingDown = targetTime > now
		const difference = isCountingDown ? targetTime - now : now - targetTime

		active = !isCountingDown
		soon = false
		if (!active && difference < 1000 * 60 * 5) {
			soon = true
		}

		const hours = Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
			.toString()
			.padStart(2, '0')
		const minutes = Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)))
			.toString()
			.padStart(2, '0')
		const seconds = Math.max(0, Math.floor((difference % (1000 * 60)) / 1000))
			.toString()
			.padStart(2, '0')

		return { hours, minutes, seconds }
	}

	const interval = setInterval(() => {
		timeRemaining = calculateTimeRemaining()
	}, 1000)

	onDestroy(() => {
		clearInterval(interval)
	})

	function getNextEventTime(timer: any): [Date, object, string] {
		var now = new Date()
		var startOfNextDay = getUTCTimeForStartOfNextDay()
		var startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000

		var nextEventTime = now.getTime()
		var add: string = ''
		var duration = [0, 0]

		for (let i = 0; i < timer.times.length; i++) {
			if (
				startOfThisDay +
					timer.times[i][0] * 60 * 60 * 1000 +
					timer.times[i][1] * 60 * 1000 +
					timer.duration[0] * 60 * 60 * 1000 +
					timer.duration[1] * 60 * 1000 >
				now.getTime()
			) {
				nextEventTime =
					startOfThisDay + timer.times[i][0] * 60 * 60 * 1000 + timer.times[i][1] * 60 * 1000
				if (timer.times[i][2]) {
					add = timer.times[i][2]
				}
				duration = timer.duration
				break
			}
		}
		return [new Date(nextEventTime), duration, add]
	}

	function getUTCTimeForStartOfNextDay() {
		const now = new Date()
		const tomorrow = new Date(now)
		tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
		tomorrow.setUTCHours(0, 0, 0, 0)
		return tomorrow
	}
</script>

<div
	class="eventTimer text-right text-xs"
	class:text-neutral-300={!active && !soon}
	class:text-lime-500={active}
	class:text-yellow-300={soon}
>
	{#if add.length > 0}
		<div>
			{add}
		</div>
	{/if}
	<div class="inline-flex">
		{#if active}
			<div class="mr-1.5"><i class="fa-solid fa-play"></i></div>
		{/if}
		{#if soon}
			<div class="mr-1.5"><i class="fa-solid fa-stopwatch"></i></div>
		{/if}
		<div>
			{timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
		</div>
		{#if active}
			<div class="mx-0.5">/</div>
			<div>{duration[0]}:{duration[1]}:00</div>
		{/if}
	</div>
</div>
