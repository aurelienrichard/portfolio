<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
	import { fade, scale, blur } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import { score } from './stores'
	import MoveIcon from './MoveIcon.svelte'
	import { moves } from './moves'
	import type { MoveKey } from './moves'
	import type { Result } from './getResult'

	export let playerMove: MoveKey
	export let computerMove: MoveKey
	export let result: Result

	const dispatch = createEventDispatcher()

	const handleScore = async () => {
		if (result === 'you win') await score.increment()
		else if (result === 'you lose') await score.decrement()
	}

	onMount(async () => {
		await handleScore()
	})
</script>

<div in:fade={{ delay: 400, easing: cubicIn }} out:fade={{ easing: cubicOut }} class="round">
	<div class="player">
		<h2>you picked</h2>
		<MoveIcon move={moves[playerMove]} />
	</div>
	<div class="computer">
		<h2>the house picked</h2>
		<div class="container">
			<div in:scale={{ delay: 1000, duration: 800, easing: cubicOut }}>
				<MoveIcon move={moves[computerMove]} />
			</div>
			<div class="background" />
		</div>
	</div>
	<div class="flex-break" />
	<div class="result" in:fade={{ delay: 1200, duration: 600, easing: cubicIn }}>
		<h1 in:blur={{ delay: 1200, duration: 600, easing: cubicIn }}>{result}</h1>
		<button on:click={() => dispatch('restart')}>play again</button>
	</div>
</div>

<style>
	h1 {
		font-size: 3.5em;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin: 0;
	}

	h2 {
		font-size: 1.4em;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin: 0;
	}

	button {
		text-transform: uppercase;
		background: var(--white-text);
		color: var(--dark-text);
		border: none;
		letter-spacing: 0.12em;
		font-weight: 600;
		height: 3.5em;
		width: 100%;
		font-size: 0.8em;
		border-radius: 0.5em;
	}

	.round > div:not(.flex-break) {
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.player,
	.computer {
		flex-direction: column;
		gap: 2em;
	}

	.flex-break {
		height: 0;
		width: 0;
		flex-basis: 100%;
	}

	.result {
		flex-direction: column;
		gap: 1em;
	}

	.round {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		top: 2em;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.background {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 75%;
		width: 75%;
		border-radius: 100%;
		background: rgba(0, 0, 0, 0.1);
		transform: translate(-50%, -50%);
		z-index: -999;
	}

	@media screen and (max-width: 640px) {
		.player,
		.computer {
			flex-direction: column-reverse;
		}

		.flex-break {
			display: none;
		}

		.round {
			height: 80%;
		}
	}
</style>