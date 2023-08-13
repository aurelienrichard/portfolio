<script lang="ts">
	import { onMount } from 'svelte'
	import Grid from './Grid.svelte'
	import { emojis } from '../emojis'
	import { levels } from '../levels'
	import type { Level } from '../levels'
	import { shuffle } from '../utils'
	import Found from './Found.svelte'
	import Countdown from './Countdown.svelte'

	const level = levels[0] as Level
	const { duration } = level
	let remaining = duration
	let playing = false

	const countdown = () => {
		const start = Date.now()
		const remainingAtStart = remaining

		const loop = () => {
			if (playing) return

			requestAnimationFrame(loop)
			remaining = remainingAtStart - (Date.now() - start)

			if (remaining <= 0) {
				playing = false
			}
		}

		loop()
	}

	onMount(countdown)

	const initializeGrid = (level: Level) => {
		const emojisCopy = [...emojis]
		const pairs: string[] = []

		for (let i = 0; i < level.size ** 2 / 2; i += 1) {
			const randomIndex = Math.floor(Math.random() * emojisCopy.length)
			const [emoji] = emojisCopy.splice(randomIndex, 1)

			pairs.push(emoji as string)
		}

		pairs.push(...pairs)

		return shuffle(pairs)
	}

	let size: number = level.size
	let grid: string[] = initializeGrid(level)
	let found: string[] = []
</script>

<div class="game">
	<div class="info">
		<Countdown {duration} {remaining} />
	</div>

	<div class="grid-container">
		<Grid
			{grid}
			on:found={(e) => {
				found = [...found, e.detail.emoji]
			}}
			{found}
		/>
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
		font-size: min(1vmin, 0.5rem);
	}

	.info {
		width: 80em;
		height: 10em;
	}

	.grid-container {
		width: 80em;
		height: 80em;
	}
</style>
