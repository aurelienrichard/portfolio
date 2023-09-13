import { get } from '$lib/server/api'
import { views } from '$lib/views'
import {
	movieListSchema,
	movieDetailsSchema,
	featuredMovieSchema,
	type MovieDetails,
	type FeaturedMovie
} from '$lib/schemas'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const [trending, playing, upcoming] = await Promise.all([
		get(fetch, views.trending.endpoint, movieListSchema),
		get(fetch, views.playing.endpoint, movieListSchema),
		get(fetch, views.upcoming.endpoint, movieListSchema)
	])
	const { id } = trending.results[0]!
	const featuredMovieDetails: MovieDetails = await get(fetch, `movie/${id}`, movieDetailsSchema, {
		append_to_response: 'images'
	})
	const featured: FeaturedMovie = featuredMovieSchema.parse(featuredMovieDetails)

	return {
		trending,
		playing,
		upcoming,
		featured
	}
}
