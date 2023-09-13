<script lang="ts">
	import type { MovieListResult } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'

	export let movies: MovieListResult[]
</script>

<div class="carousel flex snap-x gap-2 overflow-x-scroll">
	{#each movies as movie}
		<a class="flex-shrink-0 snap-start" href="/movie/{movie.id}">
			<img
				class="w-full rounded-md"
				src={getMediaURL(movie.poster_path, 500)}
				alt={movie.title}
				style="max-width: 13rem; width: 16vw"
			/>
		</a>
	{/each}
</div>

<style lang="postcss">
	.carousel {
		scrollbar-width: none;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}
</style>
