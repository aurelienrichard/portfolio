<script lang="ts">
	import { slide, fade } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const handleClose = () => {
		dispatch('close')
	}
</script>

<div class="backdrop" transition:fade={{ duration: 200 }}>
	<div class="background" transition:slide={{ duration: 400, easing: cubicOut }}>
		<h2>rules</h2>
		<button on:click={handleClose}>
			<img src="icon-close.svg" alt="close button" />
		</button>
		<img class="rules" src="image-rules.svg" alt="rules of rock paper scissors lizard spock" />
	</div>
</div>

<style>
	button {
		background: transparent;
		border: none;
	}

	img {
		pointer-events: none;
		margin: 0 auto;
	}

	h2 {
		font-size: 2em;
		color: var(--dark-text);
		margin: 0;
		text-transform: uppercase;
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		transition: all 0.2s;
		user-select: none;
	}

	.background {
		background: var(--white-text);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		width: 25em;
		height: min(150vmin, 30em);
		padding: 2em 1.8em;
		border-radius: 0.5em;
	}

	.rules {
		font-size: min(90vmin, 22em);
		width: 1em;
		height: 1em;
	}

	@media screen and (max-width: 400px) {
		h2 {
			margin: 0 auto;
		}

		button {
			order: 3;
			margin: 0 auto;
		}

		.background {
			height: 100%;
			align-items: center;
			justify-content: center;
		}
	}
</style>
