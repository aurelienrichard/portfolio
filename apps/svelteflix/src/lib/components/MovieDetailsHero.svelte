<script lang="ts">
	import { onMount } from 'svelte'
	import type { MovieDetails } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'
	import Stars from './Stars.svelte'

	export let movie: MovieDetails

	let overviewContainer: HTMLDivElement
	let overview: HTMLParagraphElement
	let container: HTMLDivElement
	let imgHeight: number
	let scrollable: boolean
	let duration: number

	const handleResize = () => {
		if (!overview) return
		scrollable = overviewContainer.scrollHeight > overviewContainer.clientHeight
		duration = overview.clientHeight * 120
		if (!container) return
		imgHeight = container.clientWidth / 1.778
	}

	onMount(handleResize)
</script>

<svelte:window on:resize={handleResize} />

<div bind:this={container} class="relative pt-10">
	<div
		class="relative from-black to-transparent after:absolute after:bottom-0 after:h-2/3 after:w-full after:rounded-sm after:bg-gradient-to-t"
	>
		<img
			use:lazyLoad
			class:px-4={!movie.backdrop}
			class="rounded-md"
			src={movie.backdrop ? getMediaURL(movie.backdrop.file_path, 1280) : logo}
			alt={movie.title}
			style="aspect-ratio: {movie.backdrop
				? movie.backdrop.aspect_ratio
				: 1778 / 1}; height: {movie.backdrop ? 'auto' : `${imgHeight}px`}"
			loading="lazy"
		/>
		<div class="b-8 absolute h-16 w-full rounded-b-md bg-black sm:h-28 lg:h-40" />
	</div>
	<div
		class="absolute bottom-0 w-11/12 translate-x-4 translate-y-12 drop-shadow-md [text-wrap:balance] sm:translate-x-8 sm:translate-y-24 md:w-2/3 lg:translate-x-12 lg:translate-y-36"
	>
		<h1 class="pb-4 text-4xl font-bold sm:pb-6 sm:text-5xl lg:pb-8 lg:text-6xl">
			{movie.title}
			<Stars average={movie.vote_average} total={movie.vote_count} />
		</h1>

		<div
			bind:this={overviewContainer}
			class="overview max-h-12 overflow-y-clip pl-2 [scrollbar-width:none] sm:max-h-24 lg:max-h-40 [&::-webkit-scrollbar]:hidden"
		>
			<p
				bind:this={overview}
				class:animate-[scrolling_linear_infinite]={scrollable}
				class="text-sm sm:text-base lg:text-lg"
				style={`animation-duration: ${duration}ms`}
			>
				{movie.overview}
			</p>
		</div>
	</div>
</div>

<noscript>
	<style lang="postcss">
		.overview {
			overflow-y: scroll;
		}
	</style>
</noscript>
