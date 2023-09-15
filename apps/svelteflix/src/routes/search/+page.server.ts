import { movieListSchema } from '$lib/schemas'
import { get } from '$lib/server/api'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('query')

	if (!query) return { query, movies: [] }

	const data = await get(fetch, 'search/movie', movieListSchema, { query })

	return {
		query,
		movies: data.results
	}
}
