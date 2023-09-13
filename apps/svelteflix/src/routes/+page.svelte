<script lang="ts">
	import Hero from '$lib/components/Hero.svelte'
	import Carousel from '$lib/components/Carousel.svelte'
	import type { FeaturedMovie, MovieList } from '$lib/schemas'

	export let data: {
		trending: MovieList
		featured: FeaturedMovie
	}
</script>

<div class="pt-8">
	<h1 class="pb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">Today's top movies</h1>
	<Hero movie={data.featured} />
</div>

<div>
	<h2 class="pb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
		Trending <a
			class="text-accent text-xl font-normal underline sm:text-2xl lg:text-3xl"
			href="/movies/trending">see all</a
		>
	</h2>
	<Carousel movies={data.trending.results} />
</div>

<svelte:head>
	<title>SvelteFlix</title>
	<meta name="description" content="are you still watching?" />
</svelte:head>
