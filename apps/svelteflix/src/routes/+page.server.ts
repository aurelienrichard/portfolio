import { get } from '$lib/server/api'
import { views } from '$lib/views'
import { movieListSchema, movieDetailsSchema } from '$lib/apiSchemas'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const [trending, playing, upcoming] = await Promise.all([
		get(fetch, views.trending.endpoint, movieListSchema, { page: '1' }),
		get(fetch, views.playing.endpoint, movieListSchema, { page: '1' }),
		get(fetch, views.upcoming.endpoint, movieListSchema, { page: '1' })
	])
	const { id } = trending.results[0]!
	const featured = await get(fetch, `movie/${id}`, movieDetailsSchema, {
		append_to_response: 'images,videos,recommendations'
	})

	return {
		title: 'SvelteFlix',
		trending,
		playing,
		upcoming,
		featured
	}
}
