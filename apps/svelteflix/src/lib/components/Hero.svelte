<script lang="ts">
	import { onMount } from 'svelte'
	import type { FeaturedMovie } from '$lib/schemas'
	import { getMediaURL } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'

	export let movie: FeaturedMovie

	let container: HTMLAnchorElement
	let imgHeight: number

	const handleResize = () => {
		if (!container) return
		imgHeight = container.clientWidth / 1.778
	}

	onMount(handleResize)
</script>

<svelte:window on:resize={handleResize} />

<a bind:this={container} class="relative flex" href="/movies/{movie.id}">
	<img
		use:lazyLoad
		class:px-4={!movie.backdrop}
		class="rounded-md"
		src={movie.backdrop ? getMediaURL(movie.backdrop.file_path, 1280) : logo}
		alt={movie.title}
		style="aspect-ratio: {movie.backdrop
			? movie.backdrop.aspect_ratio
			: 1.778 / 1}; height: {movie.backdrop ? 'auto' : `${imgHeight}px`}"
	/>
	{#if movie.logo}
		<img
			use:lazyLoad
			class="absolute left-4 top-2/4 w-1/4 -translate-y-1/2 drop-shadow-md"
			src={getMediaURL(movie.logo.file_path, 1280)}
			alt={movie.title}
			style="aspect-ratio: {movie.logo.aspect_ratio}"
		/>
	{/if}
</a>
