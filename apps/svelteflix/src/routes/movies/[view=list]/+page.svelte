<script lang="ts">
	import MoviesPage from '$lib/components/MoviesPage.svelte'
	import type { MovieListResult } from '$lib/schemas'
	import type { Endpoint, Title, ViewsKey } from '$lib/views'

	export let data: {
		view: ViewsKey
		title: Title
		movies: MovieListResult[]
		endpoint: Endpoint
		nextPage: number | null
	}
</script>

<div class="pt-10">
	<h1 class="pb-4 text-4xl font-bold sm:pb-6 sm:text-5xl lg:pb-8 lg:text-6xl">
		{data.title}
	</h1>

	<MoviesPage
		movies={data.movies}
		next={data.nextPage ? `/movies/${data.view}?page=${data.nextPage}` : null}
		on:requestMoreData|once={() => {
			console.log('requesting more data')
		}}
	/>
</div>
