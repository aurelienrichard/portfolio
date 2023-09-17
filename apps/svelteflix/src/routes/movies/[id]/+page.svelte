<script lang="ts">
	import type { MovieDetails } from '$lib/schemas'
	import MovieDetailsHero from '$lib/components/MovieDetailsHero.svelte'
	import Carousel from '$lib/components/Carousel.svelte'
	import MovieDetailsGrid from '$lib/components/MovieDetailsGrid.svelte'

	export let data: {
		title: string
		movie: MovieDetails
	}
</script>

<MovieDetailsHero movie={data.movie} />

<MovieDetailsGrid movie={data.movie} />

{#if data.movie.recommendations.length > 0}
	<div>
		<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
			More like this
		</h2>
		<Carousel view={null} movies={data.movie.recommendations} />
	</div>
{/if}
