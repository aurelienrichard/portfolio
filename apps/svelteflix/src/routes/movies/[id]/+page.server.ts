import { movieInfoSchema } from '$lib/schemas'
import { get } from '$lib/server/api'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, fetch }) => {
	const movie = await get(fetch, `/movie/${params.id}`, movieInfoSchema, {
		append_to_response: 'images,videos,recommendations'
	})

	return {
		title: movie.title,
		movie
	}
}
