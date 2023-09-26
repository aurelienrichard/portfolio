<script lang="ts">
	import type { Session } from '@supabase/supabase-js'
	import MovieDetails from '$lib/components/MovieDetails.svelte'
	import type { MovieDetails as MovieDetailsType } from '$lib/apiSchemas'
	import Carousel from '$lib/components/Carousel.svelte'

	export let data: {
		title: string
		movie: MovieDetailsType
		session: Session
		inWatchlist: boolean
	}
</script>

<MovieDetails movie={data.movie} session={data.session} inWatchlist={data.inWatchlist} />

{#if data.movie.recommendations.length > 0}
	<div>
		<h2 class="pb-4 text-3xl font-bold sm:pb-6 sm:text-4xl lg:pb-8 lg:text-5xl">
			More like this
		</h2>
		<Carousel view={null} movies={data.movie.recommendations} />
	</div>
{/if}
