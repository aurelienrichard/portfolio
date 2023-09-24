import { movieListSchema } from '$lib/apiSchemas'
import { get } from '$lib/server/api'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('query')

	if (!query) return { title: 'Search', query, movies: [] }

	const data = await get(fetch, 'search/movie', movieListSchema, { query })

	return {
		title: query,
		query,
		movies: data.results
	}
}
