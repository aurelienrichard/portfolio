<script lang="ts">
	import { onMount } from 'svelte'

	let progress = 0
	let visible = false

	onMount(() => {
		const next = () => {
			visible = true
			progress += 0.1

			const remaining = 1 - progress
			if (remaining > 0.15) setTimeout(next, 500 / remaining)
		}

		setTimeout(next, 250)
	})
</script>

{#if visible}
	<div class="fixed left-0 top-0 z-50 h-1 w-full">
		<div
			class="bg-accent absolute left-0 top-0 h-full transition-[width] duration-200"
			style="width: {progress * 100}%"
		/>
	</div>
{/if}

{#if progress >= 0.4}
	<div class="pointer-events-none fixed z-40 h-full w-full animate-pulse bg-[rgba(0,0,0,0.3)]" />
{/if}
