<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import type { MovieListResult } from '$lib/apiSchemas'
	import MovieListGrid from '$lib/components/MovieListGrid.svelte'

	export let data: {
		title: string
		movies: MovieListResult[]
	}
</script>

<div in:fly={{ y: 40, duration: 600, easing: cubicOut, delay: 400 }} out:fade class="pt-10">
	<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">{data.title}</h1>
	<div class="py-4 sm:py-6 lg:py-8">
		{#if data.movies.length > 0}
			<MovieListGrid movies={data.movies} next={null} />
		{:else}
			<p class="text-base sm:text-lg lg:text-xl">Your watchlist is empty</p>
		{/if}
	</div>
</div>
