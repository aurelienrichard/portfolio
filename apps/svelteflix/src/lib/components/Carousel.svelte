<script lang="ts">
	import type { MovieListResult } from '$lib/schemas'
	import type { View } from '$lib/views'
	import { getMediaURL } from '$lib/utils'

	export let view: View
	export let movies: MovieListResult[]
</script>

<div>
	<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
		{view.title}
		<a
			class="text-accent text-xl font-normal underline sm:text-2xl lg:text-3xl"
			href={view.href}>see all</a
		>
	</h2>
	<div
		class="flex snap-x snap-mandatory scroll-pl-2 gap-2 overflow-x-scroll pl-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
	>
		{#each movies as movie}
			<a class="flex-shrink-0 snap-start" href="/movie/{movie.id}">
				{#if movie.poster_path}
					<img
						class="aspect-[2/3] w-[16vw] max-w-[13rem] rounded-md"
						src={getMediaURL(movie.poster_path, 500)}
						alt={movie.title}
					/>
				{:else}
					<div
						class="flex h-full items-center justify-center rounded-md [background:rgba(0,0,0,0.8)]"
					>
						<div class="text-accent text- text-center font-semibold">
							{movie.title}
						</div>
					</div>
				{/if}
			</a>
		{/each}
	</div>
</div>
