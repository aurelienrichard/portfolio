<script lang="ts">
	import type { FeaturedMovie } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'

	export let movie: FeaturedMovie
</script>

<a class="relative flex" href="/movie/{movie.id}">
	<img
		class="rounded-md"
		src={getMediaURL(movie.backdrop.file_path, 1280)}
		alt={movie.title}
		style="aspect-ratio: {movie.backdrop.aspect_ratio}"
	/>
	<img
		class="absolute left-4 top-2/4 w-1/4 -translate-y-1/2 drop-shadow-md"
		src={getMediaURL(movie.logo.file_path, 1280)}
		alt={movie.title}
		style="aspect-ratio: {movie.logo.aspect_ratio}"
	/>
</a>
