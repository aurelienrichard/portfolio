<script lang="ts">
	import type { MovieDetails } from '$lib/apiSchemas'
	import { getMediaURL } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'

	export let movie: MovieDetails
</script>

<a class="relative flex" href="/movies/{movie.id}">
	<img
		use:lazyLoad
		class:px-4={!movie.backdrop}
		class="rounded-md"
		src={movie.backdrop ? getMediaURL(movie.backdrop.file_path, 1280) : logo}
		alt={movie.title}
		style="aspect-ratio: {movie.backdrop ? movie.backdrop.aspect_ratio : 1.778 / 1}}"
	/>
	{#if movie.logo}
		<img
			use:lazyLoad
			class="absolute left-4 top-2/4 w-1/4 -translate-y-1/2 drop-shadow-md"
			src={getMediaURL(movie.logo.file_path, 500)}
			alt={movie.title}
			style="aspect-ratio: {movie.logo.aspect_ratio}"
		/>
	{/if}
</a>
