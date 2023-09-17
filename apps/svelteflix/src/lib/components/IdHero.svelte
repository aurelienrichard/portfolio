<script lang="ts">
	import { onMount } from 'svelte'
	import type { MovieInfo } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'
	import Stars from './Stars.svelte'

	export let movie: MovieInfo

	let overview: HTMLDivElement
	let container: HTMLDivElement
	let imgHeight: number
	let scrollable: boolean
	let duration: number

	const handleResize = () => {
		if (!overview) return
		scrollable = overview.scrollHeight > overview.clientHeight
		duration = (movie.overview.length * 60) / 1000
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
			<span>
				<Stars average={movie.vote_average} total={movie.vote_count} />
			</span>
		</h1>

		<div bind:this={overview} class="max-h-12 overflow-y-clip pl-2 sm:max-h-24 lg:max-h-40">
			<p
				class:lg:animate-[scrolling-lg_linear_infinite]={scrollable}
				class:sm:animate-[scrolling-sm_linear_infinite]={scrollable}
				class:animate-[scrolling_linear_infinite]={scrollable}
				class="text-sm hover:[animation-play-state:paused] sm:text-base lg:text-lg"
				style={`animation-duration: ${duration}s`}
			>
				{movie.overview}
			</p>
		</div>
	</div>
</div>
