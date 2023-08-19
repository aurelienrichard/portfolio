<script lang="ts">
	import { moves } from './moves'
	import Header from './Header.svelte'
	import MoveButton from './MoveButton.svelte'
</script>

<div class="game">
	<Header />
	<div class="move-selection">
		{#each moves as move}
			<MoveButton {move} />
		{/each}
	</div>
</div>

<style>
	.game {
		display: flex;
		font-size: min(2vmin, 1.5rem);
		width: 90vmin;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0em;
	}

	.move-selection {
		background: no-repeat center/45% url('bg-pentagon.svg');
		height: 70vmin;
		width: inherit;
	}
</style>
