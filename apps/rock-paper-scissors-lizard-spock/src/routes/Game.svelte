<script lang="ts">
	import Header from './Header.svelte'
	import MoveSelection from './MoveSelection.svelte'
	import RulesModal from './RulesModal.svelte'

	let showModal = false
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
	<MoveSelection />
	<button on:click={() => (showModal = true)}>rules</button>
</div>

<style>
	.game {
		display: flex;
		font-size: min(2vmin, 1.5rem);
		height: 100%;
		width: 80vmin;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button {
		font-size: min(2em, 1rem);
		position: fixed;
		bottom: 2em;
		right: 2em;
		border: 2px solid var(--header-outline);
		border-radius: 0.4em;
		background: transparent;
		color: inherit;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 1.5px;
		padding: 0.6em 3em;
		box-shadow:
			inset 0 0 0 1px rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	@media screen and (max-width: 400px) {
		.game {
			gap: 8em;
		}

		button {
			position: relative;
			bottom: 0;
			right: 0;
		}
	}
</style>
