import { api } from '$lib/api'
import type { MovieList, MovieDetails, MovieListResult } from '$lib/schemas'
import { movieListSchema, movieDetailsSchema } from '$lib/schemas'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const trending: MovieList = await api.get(fetch, 'trending/movie/day', movieListSchema)
	const { id } = trending.results[0] as MovieListResult
	const featured: MovieDetails = await api.get(fetch, `movie/${id}`, movieDetailsSchema, {
		append_to_response: 'images'
	})

	return {
		trending,
		featured
	}
}
