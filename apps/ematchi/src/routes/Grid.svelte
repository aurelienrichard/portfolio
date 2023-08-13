<script lang="ts">
	import type { Emoji } from '../emojis'
	import { createEventDispatcher } from 'svelte'
	import Square from './Square.svelte'
	export let grid: Emoji[]
	export let found: Emoji[]

	const dispatch = createEventDispatcher()
	let a = -1
	let b = -1
	let timeoutId: number
</script>

<div class="grid">
	{#each grid as emoji, i}
		<Square
			{emoji}
			on:click={() => {
				if (found.some((e) => e.alt === emoji.alt)) return
				clearTimeout(timeoutId)
				if (a === -1 && b === -1) {
					a = i
				} else if (b === -1 && i !== a) {
					b = i

					if (grid[a] === grid[b]) {
						dispatch('found', { emoji })
					} else {
						timeoutId = window.setTimeout(() => {
							a = -1
							b = -1
						}, 1000)
					}
				} else {
					a = i
					b = -1
				}
			}}
			flipped={a === i || b === i}
			found={found.some((e) => e.alt === emoji.alt)}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		height: 100%;
		grid-gap: 0.5em;
	}
</style>
