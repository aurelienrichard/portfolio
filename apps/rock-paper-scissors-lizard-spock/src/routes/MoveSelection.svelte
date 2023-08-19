<script lang="ts">
	import { moves } from './moves'
	import MoveButton from './MoveButton.svelte'
</script>

<div class="move-selection">
	{#each moves as move}
		<MoveButton {move} />
	{/each}
</div>

<style>
	.move-selection {
		background: no-repeat center/min(70%, 22rem) url('bg-pentagon.svg');
		height: min(100vmin, 35rem);
		width: inherit;
	}
</style>
