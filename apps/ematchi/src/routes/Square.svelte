<script lang="ts">
	import type { Emoji } from '../emojis'
	export let emoji: Emoji
	export let flipped: boolean
	export let found: boolean
</script>

<div class="square">
	<button on:click class:flipped></button>
	{#if !found}
		<img src={emoji.url} alt={emoji.alt} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		background: yellow;
	}

	button.flipped {
		background: red;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	img {
		height: 7em;
		width: 7em;
		pointer-events: none;
	}
</style>
