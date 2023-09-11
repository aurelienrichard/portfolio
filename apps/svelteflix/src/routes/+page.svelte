<script lang="ts">
	import Hero from '$lib/components/Hero.svelte'
	import Carousel from '$lib/components/Carousel.svelte'
	import type { FeaturedMovie, MovieList } from '$lib/schemas'

	export let data: {
		trending: MovieList
		featured: FeaturedMovie
	}
</script>

<h1 class="pb-8 pt-16 text-5xl font-bold">Today's top movies</h1>

<Hero movie={data.featured} />

<h2 class="pb-8 pt-16 text-4xl font-bold">
	Trending <a class="text-accent text-2xl font-normal underline" href="/movies/trending"
		>see more...</a
	>
</h2>
<Carousel movies={data.trending.results} />

<svelte:head>
	<title>SvelteFlix</title>
	<meta name="description" content="are you still watching?" />
</svelte:head>
