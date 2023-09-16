<script lang="ts">
	import type { MovieInfo } from '$lib/schemas'
	import IdHero from '$lib/components/IdHero.svelte'

	export let data: {
		movie: MovieInfo
	}
</script>

<svelte:head>
	<title>{data.movie.title}</title>
</svelte:head>

<IdHero movie={data.movie} />

<div class="grid gap-4 sm:gap-8 md:grid-cols-2 lg:gap-12">
	{#if data.movie.trailer}
		<div>
			<h2 class="py-4 text-2xl font-bold sm:py-6 sm:text-3xl lg:py-8 lg:text-4xl">Trailer</h2>
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
		<h2 class="py-4 text-2xl font-bold sm:py-6 sm:text-3xl lg:py-8 lg:text-4xl">Details</h2>
	</div>
</div>
