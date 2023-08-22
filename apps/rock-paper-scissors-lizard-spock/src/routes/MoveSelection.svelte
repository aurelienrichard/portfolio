<script lang="ts">
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import { createEventDispatcher } from 'svelte'
	import { moves } from './moves'
	import MoveButton from './MoveButton.svelte'
	import type { MoveKey } from './moves'

	const dispatch = createEventDispatcher()
	const keys = Object.keys(moves) as MoveKey[]
</script>

<div
	in:fade={{ delay: 400, easing: cubicIn }}
	out:fade={{ delay: 100, easing: cubicOut }}
	class="move-selection"
>
	{#each keys as key (key)}
		<MoveButton
			{key}
			move={moves[key]}
			on:click={() => {
				dispatch('selected', key)
			}}
		/>
	{/each}
</div>

<style>
	.move-selection {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: no-repeat center/min(70%, 22rem) url('/bg-pentagon.svg');
	}
</style>
