<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { MovieListResult } from '$lib/schemas'
	import { getMediaURL, getNumberOfColumns } from '$lib/utils'

	export let movies: MovieListResult[]
	export let next: string | null

	const dispatch = createEventDispatcher()

	let viewport: HTMLDivElement
	let grid: HTMLDivElement
	let a = 0
	let b = movies.length
	let paddingTop = 0
	let paddingBottom = 0
	let itemHeight: number
	let columns: 4 | 3 | 2

	const handleScroll = () => {
		const remaining = viewport.scrollHeight - (viewport.scrollTop + viewport.clientHeight)

		if (remaining < 400) dispatch('requestMoreData')

		a = Math.floor(viewport.scrollTop / itemHeight) * columns
		b = Math.ceil((viewport.scrollTop + viewport.clientHeight) / itemHeight) * columns

		paddingTop = Math.floor(a / columns) * itemHeight
		paddingBottom = Math.floor((movies.length - b) / columns) * itemHeight
	}

	const handleResize = () => {
		const first = grid.firstChild as HTMLAnchorElement
		itemHeight = first.offsetHeight
		columns = getNumberOfColumns(window.innerWidth)
		handleScroll()
	}

	onMount(handleResize)
</script>

<svelte:window on:resize={handleResize} />

<div
	bind:this={viewport}
	on:scroll={handleScroll}
	class="viewport flex h-[65vh] snap-y snap-mandatory scroll-pt-2 flex-col overflow-y-auto pt-2"
>
	<div
		bind:this={grid}
		class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
		style:padding-top="{paddingTop}px"
		style:padding-bottom="{paddingBottom}px"
	>
		{#each movies.slice(a, b) as movie}
			<a class="w-full snap-start" href="/movie/{movie.id}">
				<img
					class="aspect-[2/3] w-full rounded-md"
					src={getMediaURL(movie.poster_path, 500)}
					alt={movie.title}
				/>
			</a>
		{/each}
	</div>

	{#if next}
		<div class="py-8 text-right">
			<a class="text-accent text-xl font-normal underline sm:text-2xl lg:text-3xl" href={next}
				>next page</a
			>
		</div>
	{/if}
</div>

<style lang="postcss">
	.viewport {
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		display: none;
	}
</style>
