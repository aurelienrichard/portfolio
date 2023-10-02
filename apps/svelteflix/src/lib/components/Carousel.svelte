<script lang="ts">
	import type { MovieListResult } from '$lib/apiSchemas'
	import type { View } from '$lib/views'
	import { getMediaURL } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'

	export let view: View | null
	export let movies: MovieListResult[]
</script>

<div>
	{#if view}
		<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
			{view.title}
			<a class="text-accent text-xl underline sm:text-2xl lg:text-3xl" href={view.href}
				>see all</a
			>
		</h2>
	{/if}
	<div
		class="flex snap-x snap-mandatory scroll-pl-2 gap-2 overflow-x-scroll pl-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
	>
		{#each movies as movie (movie.id)}
			<a
				class="flex-shrink-0 snap-start rounded-md bg-[rgba(0,0,0,0.8)]"
				href="/movies/{movie.id}"
			>
				<img
					use:lazyLoad
					class:px-4={!movie.poster_path}
					class="aspect-[2/3] w-[16vw] max-w-[13rem] rounded-md"
					src={movie.poster_path ? getMediaURL(movie.poster_path, 300) : logo}
					alt={movie.title}
					loading="lazy"
				/>
			</a>
		{/each}
	</div>
</div>
