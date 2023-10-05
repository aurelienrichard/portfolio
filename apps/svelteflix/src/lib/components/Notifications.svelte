<script lang="ts">
	import { fade, slide } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { notifications, newest } from '$lib/stores'
</script>

<div
	class="pointer-events-none fixed top-16 z-10 flex w-full max-w-7xl flex-col gap-4 bg-transparent px-8 sm:px-16 lg:px-24"
>
	{#each $notifications as notification (notification.id)}
		<div
			in:slide={{ easing: quintOut, duration: 600 }}
			out:fade={{ duration: 200 }}
			class="pointer-events-auto rounded-xl bg-gradient-to-r from-indigo-950 to-indigo-700 p-2 shadow-[0_0_1rem_black] sm:p-3 lg:p-4"
		>
			{#if $newest === notification.id}
				<span class="text-accent text-base font-semibold sm:text-lg lg:text-xl">new</span>
			{/if}
			<h3 class="text-lg font-bold sm:text-xl lg:text-2xl">
				{notification.message}
			</h3>
		</div>
	{/each}
</div>
