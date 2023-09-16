<script lang="ts">
	import type { MovieInfo } from '$lib/schemas'
	import IdHero from '$lib/components/IdHero.svelte'
	import { dollarFormatter } from '$lib/utils'
	import Carousel from '$lib/components/Carousel.svelte'

	export let data: {
		movie: MovieInfo
	}
</script>

<svelte:head>
	<title>{data.movie.title}</title>
</svelte:head>

<IdHero movie={data.movie} />

<div class="grid gap-4 pt-8 sm:gap-8 sm:pt-16 md:grid-cols-2 lg:gap-12 lg:pt-24">
	{#if data.movie.trailer}
		<div>
			<h2 class="py-4 text-3xl font-bold sm:py-6 sm:text-4xl lg:py-8 lg:text-5xl">Trailer</h2>
			<div class="relative w-full pt-[56.25%]">
				<iframe
					class="absolute left-0 top-0 aspect-video w-full rounded-md"
					src="https://youtube.com/embed/{data.movie.trailer.key}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				/>
			</div>
		</div>
	{/if}
	<div>
		<h2 class="py-4 text-3xl font-bold sm:py-6 sm:text-4xl lg:py-8 lg:text-5xl">Details</h2>
		<dl class="grid grid-cols-[max-content_1fr] items-baseline gap-4">
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">released</dt>
			<dd class="text-base sm:text-lg lg:text-xl">{data.movie.release_date}</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">runtime</dt>
			<dd class="text-base sm:text-lg lg:text-xl">{data.movie.runtime} minutes</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">budget</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{dollarFormatter.format(data.movie.budget)}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">revenue</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{dollarFormatter.format(data.movie.revenue)}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">genre</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{data.movie.genres.map((genre) => genre.name).join(', ')}
			</dd>
		</dl>
	</div>
</div>

{#if data.movie.recommendations.results.length > 0}
	<div>
		<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
			More like this
		</h2>
		<Carousel view={null} movies={data.movie.recommendations.results} />
	</div>
{/if}
