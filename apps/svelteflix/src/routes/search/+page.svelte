<script lang="ts">
	import MovieListGrid from '$lib/components/MovieListGrid.svelte'
	import type { MovieListResult } from '$lib/apiSchemas'

	export let data: {
		title: string
		query: string
		movies: MovieListResult[]
	}

	let { query } = data
</script>

<div class="pt-10">
	<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">Search</h1>

	<form class="flex py-4 sm:py-6 lg:py-8">
		<input
			type="text"
			class="focus-visible:outline-accent w-full rounded-s-md bg-[rgba(255,255,255,0.1)] p-2 text-xl focus-visible:outline focus-visible:outline-2 sm:text-2xl lg:text-3xl"
			name="query"
			bind:value={query}
			placeholder="movie title"
			required
		/>
		<button
			class="bg-accent w-40 rounded-e-md text-base transition-colors duration-200 sm:w-44 sm:text-lg lg:w-48 lg:text-xl"
			type="submit">Find movies</button
		>
	</form>

	{#if data.query}
		{#if data.movies.length > 0}
			<MovieListGrid movies={data.movies} next={null} />
		{:else}
			<p class="text-center text-base sm:text-lg lg:text-xl">No results</p>
		{/if}
	{/if}
</div>
