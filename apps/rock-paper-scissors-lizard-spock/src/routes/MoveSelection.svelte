<script lang="ts">
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import { moves } from './moves'
	import MoveButton from './MoveButton.svelte'
</script>

<div
	in:fade={{ delay: 400, easing: cubicIn }}
	out:fade={{ delay: 100, easing: cubicOut }}
	class="move-selection"
>
	{#each Object.values(moves) as move}
		<MoveButton {move} on:click />
	{/each}
</div>

<style>
	.move-selection {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: no-repeat center/min(70%, 22rem) url('bg-pentagon.svg');
	}
</style>
