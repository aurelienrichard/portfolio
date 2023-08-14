<script lang="ts">
	import type { Emoji } from '../emojis'
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'
	import { receive } from '../transitions'
	export let found: Emoji[]
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div in:fade={{ delay: 500 }} animate:flip={{ duration: 200, delay: 500 }} class="pair">
			<img in:receive={{ key: `${emoji}:a` }} src={emoji.url} alt={emoji.alt} />
			<img in:receive={{ key: `${emoji}:b` }} src={emoji.url} alt={emoji.alt} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
		height: 100%;
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}

	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5em;
		height: 5em;
		background: white;
		padding: 1em;
		border-radius: 50%;
	}

	img {
		position: absolute;
		width: 3em;
		height: 3em;
		pointer-events: none;
	}
</style>
