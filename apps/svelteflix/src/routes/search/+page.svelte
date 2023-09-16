<script lang="ts">
	import MoviesPage from '$lib/components/MoviesPage.svelte'
	import type { MovieListResult } from '$lib/schemas'

	export let data: {
		query: string
		movies: MovieListResult[]
	}
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>

<div class="pt-10">
	<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">Search</h1>

	<form class="py-4 sm:py-6 lg:py-8">
		<input
			class="focus-visible:outline-accent w-full rounded-md bg-[rgba(255,255,255,0.1)] p-2 text-xl focus-visible:outline focus-visible:outline-2 sm:text-2xl lg:text-3xl"
			name="query"
			value={data.query}
		/>
	</form>

	{#if data.query}
		<MoviesPage movies={data.movies} next={null} />
	{/if}
</div>
