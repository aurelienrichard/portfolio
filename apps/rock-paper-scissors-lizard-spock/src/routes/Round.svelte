<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import MoveIcon from './MoveIcon.svelte'
	import { moves } from './moves'
	import type { MoveKey } from './moves'

	export let playerMove: MoveKey
	export let computerMove: MoveKey
	export let result: 'you win' | 'you lose' | 'draw'

	const dispatch = createEventDispatcher()
</script>

<div in:fade={{ delay: 400, easing: cubicIn }} out:fade={{ easing: cubicOut }} class="round">
	<div class="player">
		<h2>you picked</h2>
		<MoveIcon move={moves[playerMove]} />
	</div>
	<div class="computer">
		<h2>the house picked</h2>
		<MoveIcon move={moves[computerMove]} />
	</div>
	<div class="flex-break" />
	<div class="result">
		<h1>{result}</h1>
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
