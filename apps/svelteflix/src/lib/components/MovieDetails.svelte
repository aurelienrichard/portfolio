<script lang="ts">
	import type { Session } from '@supabase/supabase-js'
	import type { MovieDetails } from '$lib/apiSchemas'
	import { getMediaURL, dollarFormatter } from '$lib/utils'
	import logo from '$lib/images/logo.svg'
	import { lazyLoad } from '$lib/actions'
	import Stars from './Stars.svelte'
	import { enhance } from '$app/forms'
	import { notifications } from '$lib/stores'
	import type { SubmitFunction } from '../../routes/watchlist/$types'

	export let movie: MovieDetails
	export let session: Session | null
	export let inWatchlist: boolean

	const placeholder = 'Unknown'
	let loading = false

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async ({ update, result }) => {
			await update()
			if (result.type === 'success') {
				notifications.addNotification(
					`${movie.title} ${inWatchlist ? 'added to' : 'removed from'} watchlist`
				)
			}

			loading = false
		}
	}
</script>

<div class="relative pt-10">
	<img
		use:lazyLoad
		class:lg:p-16={!movie.backdrop}
		class:sm:p-12={!movie.backdrop}
		class:p-8={!movie.backdrop}
		class="rounded-t-md"
		src={movie.backdrop ? getMediaURL(movie.backdrop.file_path, 1280) : logo}
		alt={movie.title}
		style="aspect-ratio: {movie.backdrop ? movie.backdrop.aspect_ratio : 'auto'}}"
	/>
	<div
		class="relative w-full rounded-b-md bg-black from-black to-transparent before:absolute before:-top-24 before:h-24 before:w-full before:bg-gradient-to-t before:sm:-top-44 before:sm:h-44 before:lg:-top-60 before:lg:h-60"
	>
		<div
			class="text-shadow-md bottom-0 w-11/12 -translate-y-8 translate-x-4 [text-wrap:balance] sm:-translate-y-16 sm:translate-x-8 md:w-2/3 lg:-translate-y-24 lg:translate-x-12"
		>
			<div class="pb-4 sm:pb-6 lg:pb-8">
				<h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">
					{movie.title}
				</h1>
				<Stars average={movie.vote_average} total={movie.vote_count} />
				<div class="pt-1 text-sm sm:pt-2 sm:text-base lg:pt-4 lg:text-lg">
					{#if session}
						<form
							method="POST"
							use:enhance={handleSubmit}
							action="/watchlist?/{inWatchlist ? 'delete' : 'add'}"
						>
							<input type="hidden" name="movie_id" value={movie.id} />
							<button class="text-accent" type="submit" disabled={loading}
								>{inWatchlist
									? 'Remove this from your watchlist'
									: 'Add this to your watchlist'}</button
							>
						</form>
					{:else}
						<p>
							<a class="text-accent underline" href="/login">Log in</a> to add this to
							your watchlist
						</p>
					{/if}
				</div>
			</div>
			<div class="pl-2">
				<p class="text-base sm:text-lg lg:text-xl">
					{movie.overview || 'No overview yet'}
				</p>
			</div>
		</div>
	</div>
</div>

<div class="grid gap-10 sm:gap-16 md:grid-cols-2 lg:gap-20">
	{#if movie.trailer}
		<div>
			<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">Trailer</h2>
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
		<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">Details</h2>
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
