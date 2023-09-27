<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { MovieListResult } from '$lib/apiSchemas'
	import { getMediaURL, getNumberOfColumns } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'

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

		if (remaining < 500) dispatch('requestMoreData')

		a = Math.floor(viewport.scrollTop / itemHeight) * columns
		b = Math.ceil((viewport.scrollTop + viewport.clientHeight) / itemHeight) * columns

		paddingTop = Math.floor(a / columns) * itemHeight
		paddingBottom = Math.floor((movies.length - b) / columns) * itemHeight
	}

	const handleResize = () => {
		const first = grid.firstChild as HTMLAnchorElement
		if (!first) return
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
	class="overflow-y-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
>
	<div
		bind:this={grid}
		class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
		style:padding-top="{paddingTop}px"
		style:padding-bottom="{paddingBottom}px"
	>
		{#each movies.slice(a, b) as movie (movie.id)}
			<a class="w-full rounded-md bg-[rgba(0,0,0,0.8)]" href="/movies/{movie.id}">
				<img
					use:lazyLoad
					class:px-4={!movie.poster_path}
					class="aspect-[2/3] w-full rounded-md"
					src={movie.poster_path ? getMediaURL(movie.poster_path, 300) : logo}
					alt={movie.title}
					loading="lazy"
				/>
			</a>
		{/each}
	</div>

	{#if next}
		<div class="py-4 text-right">
			<a class="text-accent text-xl font-normal underline sm:text-2xl lg:text-3xl" href={next}
				>next page</a
			>
		</div>
	{/if}
</div>
