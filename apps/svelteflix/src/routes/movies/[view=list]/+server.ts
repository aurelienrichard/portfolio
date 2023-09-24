import { json } from '@sveltejs/kit'
import { views, type ViewsKey } from '$lib/views'
import { get } from '$lib/server/api'
import type { RequestHandler } from './$types'
import { movieListSchema } from '$lib/apiSchemas'

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const view = params.view as ViewsKey
	const page = url.searchParams.get('page') ?? '1'
	const { endpoint } = views[view]
	const data = await get(fetch, endpoint, movieListSchema, { page })

	return json(data)
}
