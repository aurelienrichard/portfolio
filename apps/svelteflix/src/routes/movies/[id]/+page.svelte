<script lang="ts">
	import { onMount } from 'svelte'
	import type { MovieInfo } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'
	import logo from '$lib/images/logo.svg'

	export let data: {
		movie: MovieInfo
	}

	let overview: HTMLDivElement
	let container: HTMLDivElement
	let imgHeight: number
	let scrollable: boolean
	let duration: number

	const handleResize = () => {
		if (!overview) return
		scrollable = overview.scrollHeight > overview.clientHeight
		duration = (data.movie.overview.length * 60) / 1000
		if (!container) return
		imgHeight = container.clientWidth / 1.778
	}

	onMount(handleResize)
</script>

<svelte:window on:resize={handleResize} />

<div bind:this={container} class="relative pt-10">
	<div
		class="relative from-black to-transparent after:absolute after:bottom-0 after:h-3/4 after:w-full after:bg-gradient-to-t"
	>
		<img
			class:px-4={!data.movie.backdrop}
			class="rounded-md"
			src={data.movie.backdrop ? getMediaURL(data.movie.backdrop.file_path, 1280) : logo}
			alt={data.movie.title}
			style="aspect-ratio: {data.movie.backdrop
				? data.movie.backdrop.aspect_ratio
				: 1778 / 1}; height: {data.movie.backdrop ? 'auto' : `${imgHeight}px`}"
		/>
	</div>
	<div
		class="absolute bottom-0 w-4/5 translate-x-4 translate-y-4 drop-shadow-md [text-wrap:balance] sm:translate-x-8 sm:translate-y-8 md:w-2/3 lg:translate-x-12 lg:translate-y-12"
	>
		<h1 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
			{data.movie.title}
		</h1>
		<div bind:this={overview} class="max-h-12 overflow-y-clip pl-2 sm:max-h-24 lg:max-h-40">
			<p
				class:animate-[scrolling_linear_infinite]={scrollable}
				class="text-sm sm:text-base lg:text-lg"
				style={`animation-duration: ${duration}s`}
			>
				{data.movie.overview}
			</p>
		</div>
	</div>
</div>
