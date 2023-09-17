<script lang="ts">
	import type { MovieInfo } from '$lib/schemas'
	import { dollarFormatter } from '$lib/utils'

	export let movie: MovieInfo
</script>

<div class="grid gap-4 pt-8 sm:gap-8 sm:pt-16 md:grid-cols-2 lg:gap-12 lg:pt-24">
	{#if movie.trailer}
		<div>
			<h2 class="py-4 text-3xl font-bold sm:py-6 sm:text-4xl lg:py-8 lg:text-5xl">Trailer</h2>
			<div class="relative w-full pt-[56.25%]">
				<iframe
					class="absolute left-0 top-0 aspect-video w-full rounded-md"
					src="https://youtube.com/embed/{movie.trailer.key}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
					loading="lazy"
				/>
			</div>
		</div>
	{/if}
	<div>
		<h2 class="py-4 text-3xl font-bold sm:py-6 sm:text-4xl lg:py-8 lg:text-5xl">Details</h2>
		<dl class="grid grid-cols-[max-content_1fr] items-baseline gap-4">
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">release</dt>
			<dd class="text-base sm:text-lg lg:text-xl">{movie.release_date}</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">status</dt>
			<dd class="text-base sm:text-lg lg:text-xl">{movie.status}</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">runtime</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.runtime > 0 ? `${movie.runtime} minutes` : 'Unknown'}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">budget</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.budget > 0 ? dollarFormatter.format(movie.budget) : 'Unknown'}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">revenue</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.revenue > 0 ? dollarFormatter.format(movie.revenue) : 'Unknown'}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">genre</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.genres.length > 0
					? movie.genres.map((genre) => genre.name).join(', ')
					: 'Unknown'}
			</dd>
		</dl>
	</div>
</div>
