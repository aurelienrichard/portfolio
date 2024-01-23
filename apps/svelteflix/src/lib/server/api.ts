import { z } from 'zod'
import { SVELTEFLIX_API_READ_ACCESS_TOKEN, SVELTEFLIX_BASE_API_URL } from '$env/static/private'

export const get = async <Schema extends z.ZodSchema>(
	fetch: typeof globalThis.fetch,
	endpoint: string,
	schema: Schema,
	params?: Record<string, string>
) => {
	const q = new URLSearchParams(params)
	const url = `${SVELTEFLIX_BASE_API_URL}/${endpoint}?${q.toString()}`
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${SVELTEFLIX_API_READ_ACCESS_TOKEN}`,
			accept: 'application/json'
		}
	})

	return z.promise(schema).parse(response.json())
}
