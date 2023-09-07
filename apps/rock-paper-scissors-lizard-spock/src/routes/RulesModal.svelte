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
		<div class="flex-break" />
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
		font-size: min(4em, 1.8rem);
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
	}

	.background {
		background: var(--white-text);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		width: 28em;
		height: min(150vmin, 34em);
		padding: 2em 1.8em;
		border-radius: 0.5em;
	}

	.rules {
		font-size: min(80vmin, 25em);
		width: 1em;
		height: 1em;
	}

	.flex-break {
		height: 0;
		width: 0;
		flex-basis: 100%;
	}

	@media screen and (max-width: 640px) {
		h2 {
			margin: 0 auto;
		}

		button {
			order: 3;
			margin: 0 auto;
		}

		.background {
			height: 100%;
			width: 100%;
			align-items: center;
			justify-content: space-around;
			flex-direction: column;
			flex-wrap: nowrap;
			padding: 0;
		}

		.flex-break {
			display: none;
		}
	}
</style>
