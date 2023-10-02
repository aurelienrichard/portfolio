<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import Hero from '$lib/components/Hero.svelte'
	import Carousel from '$lib/components/Carousel.svelte'
	import { views } from '$lib/views'
	import type { MovieDetails, MovieList } from '$lib/apiSchemas'

	export let data: {
		trending: MovieList
		playing: MovieList
		upcoming: MovieList
		featured: MovieDetails
	}
</script>

<div class="pt-10" in:fly={{ y: 40, duration: 600, easing: cubicOut, delay: 400 }} out:fade>
	<h1 class="pb-4 text-4xl font-bold sm:pb-6 sm:text-5xl lg:pb-8 lg:text-6xl">
		Today's top movies
	</h1>
	<Hero movie={data.featured} />
</div>

<Carousel view={views.trending} movies={data.trending.results} />
<Carousel view={views.playing} movies={data.playing.results} />
<Carousel view={views.upcoming} movies={data.upcoming.results} />
