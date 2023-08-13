<script lang="ts">
	export let emoji: string
	export let flipped: boolean
	export let found: boolean
</script>

<div class="square">
	<button on:click class:flipped></button>
	{#if !found}
		<span>{emoji}</span>
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

	span {
		font-size: 5em;
		pointer-events: none;
	}
</style>
