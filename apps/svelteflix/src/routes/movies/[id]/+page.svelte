<script lang="ts">
	import type { MovieInfo } from '$lib/schemas'
	import IdHero from '$lib/components/IdHero.svelte'
	import Carousel from '$lib/components/Carousel.svelte'
	import IdDetails from '$lib/components/IdDetails.svelte'

	export let data: {
		movie: MovieInfo
	}
</script>

<svelte:head>
	<title>{data.movie.title}</title>
</svelte:head>

<IdHero movie={data.movie} />

<IdDetails movie={data.movie} />

{#if data.movie.recommendations.results.length > 0}
	<div>
		<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
			More like this
		</h2>
		<Carousel view={null} movies={data.movie.recommendations.results} />
	</div>
{/if}
