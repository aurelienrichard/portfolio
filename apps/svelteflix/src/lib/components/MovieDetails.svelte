<script lang="ts">
	import { onMount } from 'svelte'
	import type { Session } from '@supabase/supabase-js'
	import type { MovieDetails } from '$lib/apiSchemas'
	import { getMediaURL, dollarFormatter } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'
	import Stars from './Stars.svelte'

	export let movie: MovieDetails
	export let session: Session | null
	export let inWatchlist: boolean

	let overviewContainer: HTMLDivElement
	let overview: HTMLParagraphElement
	let container: HTMLDivElement
	let imgHeight: number
	let scrollable: boolean
	let duration: number

	const placeholder = 'Unknown'

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
		<div class="absolute h-32 w-full rounded-b-md bg-black sm:h-44 lg:h-56" />
	</div>
	<div
		class="absolute bottom-0 w-11/12 translate-x-4 translate-y-28 drop-shadow-md [text-wrap:balance] sm:translate-x-8 sm:translate-y-40 md:w-2/3 lg:translate-x-12 lg:translate-y-52"
	>
		<div class="pb-6 sm:pb-8 lg:pb-12">
			<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">
				{movie.title}
			</h1>
			<Stars average={movie.vote_average} total={movie.vote_count} />
			<div class="pl-1 text-sm sm:text-base lg:text-lg">
				{#if session}
					<form method="POST" action="/watchlist?/{inWatchlist ? 'delete' : 'add'}">
						<input type="hidden" name="movie_id" value={movie.id} />
						<button class="text-accent" type="submit"
							>{inWatchlist
								? 'Remove this from your watchlist'
								: 'Add this to your watchlist'}</button
						>
					</form>
				{:else}
					<p>
						<a class="text-accent underline" href="/login">Log in</a> to add this to your
						watchlist
					</p>
				{/if}
			</div>
		</div>
		<div
			bind:this={overviewContainer}
			class="overview max-h-20 overflow-y-clip pl-2 [scrollbar-width:none] sm:max-h-32 lg:max-h-48 [&::-webkit-scrollbar]:hidden"
		>
			<p
				bind:this={overview}
				class:animate-[scrolling_linear_infinite]={scrollable}
				class="text-base sm:text-lg lg:text-xl"
				style={`animation-duration: ${duration}ms`}
			>
				{movie.overview || 'No overview yet'}
			</p>
		</div>
	</div>
</div>

<div class="grid gap-4 pt-28 sm:gap-8 sm:pt-36 md:grid-cols-2 lg:gap-12 lg:pt-44">
	{#if movie.trailer}
		<div>
			<h2 class="py-4 text-3xl font-bold sm:py-6 sm:text-4xl lg:py-8 lg:text-5xl">Trailer</h2>
			<div class="relative w-full pt-[56.25%]">
				<iframe
					class="absolute left-0 top-0 aspect-video w-full rounded-md pl-2"
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
		<dl class="grid grid-cols-[max-content_1fr] items-baseline gap-2 pl-2 sm:gap-3 lg:gap-4">
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">release</dt>
			<dd class="text-base sm:text-lg lg:text-xl">{movie.release_date || placeholder}</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">status</dt>
			<dd class="text-base sm:text-lg lg:text-xl">{movie.status}</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">runtime</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.runtime > 0 ? `${movie.runtime} minutes` : placeholder}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">budget</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.budget > 0 ? dollarFormatter.format(movie.budget) : placeholder}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">revenue</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.revenue > 0 ? dollarFormatter.format(movie.revenue) : placeholder}
			</dd>
			<dt class="text-sm uppercase opacity-80 sm:text-base lg:text-lg">genre</dt>
			<dd class="text-base sm:text-lg lg:text-xl">
				{movie.genres.length > 0 ? movie.genres : placeholder}
			</dd>
		</dl>
	</div>
</div>

<noscript>
	<style lang="postcss">
		.overview {
			overflow-y: scroll;
		}
	</style>
</noscript>
