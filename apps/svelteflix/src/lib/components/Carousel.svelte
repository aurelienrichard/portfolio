<script lang="ts">
	import type { MovieListResult } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'

	export let movies: MovieListResult[]
</script>

<div class="carousel flex snap-x scroll-pl-2 gap-2 overflow-x-scroll pl-2">
	{#each movies as movie}
		<a
			class="flex-shrink-0 snap-start"
			href="/movie/{movie.id}"
			style="max-width: 13rem; width: 16vw"
		>
			<img
				class="w-full rounded-md"
				src={getMediaURL(movie.poster_path, 500)}
				alt={movie.title}
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
