import { get } from '$lib/server/api'
import type { MovieList, MovieDetails, FeaturedMovie } from '$lib/schemas'
import { movieListSchema, movieDetailsSchema, featuredMovieSchema } from '$lib/schemas'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const trending: MovieList = await get(fetch, 'trending/movie/day', movieListSchema)
	const { id } = trending.results[0]!
	const featuredMovieDetails: MovieDetails = await get(fetch, `movie/${id}`, movieDetailsSchema, {
		append_to_response: 'images'
	})
	const featured: FeaturedMovie = featuredMovieSchema.parse(featuredMovieDetails)

	return {
		trending,
		featured
	}
}
