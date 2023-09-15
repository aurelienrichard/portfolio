<script lang="ts">
	import type { MovieInfo } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'

	export let data: {
		movie: MovieInfo
	}
</script>

<div class="relative pt-10">
	<div
		class="relative from-[black] to-[transparent] after:absolute after:bottom-0 after:h-2/3 after:w-full after:bg-gradient-to-t"
	>
		<img
			class="rounded-md"
			src={getMediaURL(data.movie.backdrop.file_path, 1280)}
			alt={data.movie.title}
			style="aspect-ratio: {data.movie.backdrop.aspect_ratio}"
		/>
	</div>
	<div
		class="absolute bottom-0 translate-y-4 px-4 drop-shadow-[0_0_1rem_black] sm:translate-y-8 sm:px-8 md:w-2/3 lg:translate-y-12 lg:px-12"
	>
		<h1 class="pb-4 text-4xl font-bold sm:pb-6 sm:text-5xl lg:pb-8 lg:text-6xl">
			{data.movie.title}
		</h1>
		<p class="text-sm [text-wrap:balance] sm:text-base lg:text-lg">{data.movie.overview}</p>
	</div>
</div>
