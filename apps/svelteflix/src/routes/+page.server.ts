import { get } from '$lib/server/api'
import { views } from '$lib/views'
import { movieListSchema, featuredMovieSchema, type FeaturedMovie } from '$lib/schemas'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const [trending, playing, upcoming] = await Promise.all([
		get(fetch, views.trending.endpoint, movieListSchema, { page: '1' }),
		get(fetch, views.playing.endpoint, movieListSchema, { page: '1' }),
		get(fetch, views.upcoming.endpoint, movieListSchema, { page: '1' })
	])
	const { id } = trending.results[0]!
	const featured: FeaturedMovie = await get(fetch, `movie/${id}`, featuredMovieSchema, {
		append_to_response: 'images'
	})

	return {
		trending,
		playing,
		upcoming,
		featured
	}
}
