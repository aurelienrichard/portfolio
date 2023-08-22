<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { emojis } from './emojis'
	import type { Emoji } from './emojis'
	import type { Level } from './levels'
	import { shuffle } from './utils'
	import Grid from './Grid.svelte'
	import Found from './Found.svelte'
	import Countdown from './Countdown.svelte'

	const dispatch = createEventDispatcher()

	let size: number
	let duration: number
	let remaining: number
	let playing: boolean
	let grid: Emoji[] = []
	let found: Emoji[] = []

	const countdown = () => {
		const beginning = Date.now()
		const remainingAtStart = remaining

		const loop = () => {
			if (!playing) return

			requestAnimationFrame(loop)
			remaining = remainingAtStart - (Date.now() - beginning)

			if (remaining <= 0) {
				playing = false
				dispatch('lose')
			}
		}

		loop()
	}

	export const resume = () => {
		playing = true
		countdown()

		dispatch('play')
	}

	export const start = (level: Level) => {
		size = level.size
		remaining = level.duration
		duration = level.duration

		const emojisCopy = [...emojis]
		const pairs: Emoji[] = []

		for (let i = 0; i < level.size ** 2 / 2; i += 1) {
			const randomIndex = Math.floor(Math.random() * emojisCopy.length)
			const [emoji] = emojisCopy.splice(randomIndex, 1) as [Emoji]

			pairs.push(emoji)
		}

		grid = shuffle([...pairs, ...pairs])
		found = []

		resume()
	}

	const handleFound = (e: CustomEvent<Emoji>) => {
		const emoji = e.detail
		found = [...found, emoji]

		if (found.length === size ** 2 / 2) {
			playing = false
			window.setTimeout(() => {
				dispatch('win')
			}, 1000)
		}
	}
</script>

<svelte:window
	on:keydown|preventDefault={(e) => {
		if (e.key === 'Escape' && playing) {
			playing = false
			dispatch('pause')
		}
	}}
/>

<div class="game" style="--size: {size}">
	<div class="info">
		{#if playing}
			<Countdown
				{duration}
				{remaining}
				on:click={() => {
					playing = false
					dispatch('pause')
				}}
			/>
		{/if}
	</div>

	<div class="grid-container">
		{#key grid}
			<Grid {grid} {found} on:found={handleFound} />
		{/key}
	</div>

	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		gap: 2em;
		font-size: min(1vmin, 0.5rem);
	}

	.info {
		width: 80em;
		height: 10em;
	}

	.grid-container {
		width: 80em;
	}
</style>
