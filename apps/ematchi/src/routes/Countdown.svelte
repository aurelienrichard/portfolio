<script lang="ts">
	import { fade } from 'svelte/transition'

	export let duration: number
	export let remaining: number
</script>

<div class="countdown" transition:fade={{ duration: 200 }}>
	<button on:click>
		<img src="/pause-circle.svg" alt="pause-circle" />
	</button>
	<div class="duration">
		<div class="remaining" style="--p: {remaining / duration}" />
	</div>
</div>

<style>
	button {
		font-size: 8em;
		height: 1em;
		width: 1em;
		background: transparent;
		border: none;
	}

	img {
		border-radius: 100%;
		opacity: 0.4;
		position: absolute;
		left: 0;
		top: 0;
	}

	.countdown {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}

	.duration {
		flex: 1;
		height: 1em;
		background: #ccc;
		border-radius: 1em;
		overflow: hidden;
	}

	.remaining {
		position: absolute;
		width: calc(100% * var(--p));
		height: 100%;
		background: #999;
	}
</style>
