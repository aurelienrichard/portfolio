import { movieListSchema } from '$lib/apiSchemas'
import { get } from '$lib/server/api'
import { getNextPage } from '$lib/utils'
import { views, type ViewsKey } from '$lib/views'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const view = params.view as ViewsKey
	const page = url.searchParams.get('page') ?? '1'
	const { title, endpoint } = views[view]
	const data = await get(fetch, endpoint, movieListSchema, { page })

	return {
		view,
		title,
		movies: data.results,
		nextPage: getNextPage(data),
		infinite: true
	}
}
