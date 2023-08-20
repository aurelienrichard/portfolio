<script lang="ts">
	import type { MoveKey } from './moves'
	import Header from './Header.svelte'
	import MoveSelection from './MoveSelection.svelte'
	import Round from './Round.svelte'
	import RulesModal from './RulesModal.svelte'

	let state: 'selection' | 'round' = 'selection'
	let showModal = false
	let playerMove: MoveKey
	let computerMove: MoveKey
</script>

<svelte:window
	on:keydown|preventDefault={(e) => {
		if (e.key === 'Escape') {
			showModal = false
		}
	}}
/>

{#if showModal}
	<RulesModal on:close={() => (showModal = false)} />
{/if}

<div class="game">
	<Header />
	<div class="container">
		{#if state === 'selection'}
			<MoveSelection
				on:click|once={() => {
					state = 'round'
					playerMove = 'R'
					computerMove = 'R'
				}}
			/>
		{:else if state === 'round'}
			<Round
				on:restart={() => {
					state = 'selection'
				}}
				{playerMove}
				{computerMove}
				result="you win"
			/>
		{/if}
	</div>
	<button on:click={() => (showModal = true)}>rules</button>
</div>

<style>
	.game {
		display: flex;
		font-size: min(2vmin, 1.5rem);
		height: calc(100% - 4em);
		width: 80vmin;
		flex-direction: column;
		align-items: center;
	}

	.container {
		height: min(100vmin, 35rem);
		display: flex;
		align-items: center;
		justify-content: center;
		width: inherit;
	}

	button {
		font-size: min(1em, 1rem);
		position: fixed;
		bottom: 2em;
		right: 2em;
		border: 0.15em solid var(--header-outline);
		border-radius: 0.4em;
		background: transparent;
		color: inherit;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.12em;
		padding: 0.6em 3em;
		box-shadow:
			inset 0 0 0 1px rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	@media screen and (max-width: 640px) {
		.game {
			justify-content: center;
		}

		button {
			position: relative;
			bottom: 0;
			right: 0;
		}
	}
</style>
