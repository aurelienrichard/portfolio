<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { page } from '$app/stores'
	import MovieListGrid from '$lib/components/MovieListGrid.svelte'
	import type { MovieList, MovieListResult } from '$lib/apiSchemas'
	import { getNextPage } from '$lib/utils'
	import type { Title, ViewsKey } from '$lib/views'

	export let data: {
		view: ViewsKey
		title: Title
		movies: MovieListResult[]
		nextPage: number | null
	}

	let loading = false
	const ids = new Set()

	const handleRequestMoreData = async () => {
		if (!data.nextPage) return
		if (loading) return

		try {
			loading = true
			const response = await fetch(`${$page.url.pathname}?page=${data.nextPage ?? 2}`)
			const newMovies = (await response.json()) as MovieList

			data.movies = [
				...data.movies,
				...newMovies.results.filter((movie) => !ids.has(movie.id))
			]

			newMovies.results.forEach((movie) => {
				ids.add(movie.id)
			})

			data.nextPage = getNextPage(newMovies)
		} finally {
			loading = false
		}
	}

	onMount(() => {
		data.movies.forEach((movie) => {
			ids.add(movie.id)
		})
	})

	onDestroy(() => {
		ids.clear()
	})
</script>

<div class="flex h-full flex-col pt-10">
	<h1 class="pb-4 text-4xl font-bold sm:pb-6 sm:text-5xl lg:pb-8 lg:text-6xl">
		{data.title}
	</h1>

	<MovieListGrid
		movies={data.movies}
		next={data.nextPage ? `/movies/${data.view}?page=${data.nextPage}` : null}
		on:requestMoreData={handleRequestMoreData}
	/>
</div>
