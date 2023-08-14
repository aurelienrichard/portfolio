<script lang="ts">
	import type { Emoji } from '../emojis'
	export let emoji: Emoji
	export let flipped: boolean
	export let found: boolean
</script>

<div class="square" class:flipped={flipped || found}>
	<button on:click />
	<div class="background" />

	{#if !found}
		<img src={emoji.url} alt={emoji.alt} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		background: white;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		border: 0.5em solid #eee;
		border-radius: 1em;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background: #eee;
		border: 0;
		border-radius: 1em;
		font-size: inherit;
	}

	img {
		height: 7em;
		width: 7em;
		pointer-events: none;
		backface-visibility: hidden;
		transform: rotateY(180deg);
	}
</style>
