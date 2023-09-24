import { movieDetailsSchema } from '$lib/apiSchemas'
import { get } from '$lib/server/api'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, fetch }) => {
	const movie = await get(fetch, `/movie/${params.id}`, movieDetailsSchema, {
		append_to_response: 'images,videos,recommendations'
	})

	return {
		title: movie.title,
		movie
	}
}
