import { z } from 'zod'
import { config } from './server/config'

const get = async <Schema extends z.ZodSchema>(
	fetch: typeof globalThis.fetch,
	endpoint: string,
	schema: Schema,
	params?: Record<string, string>
) => {
	const q = new URLSearchParams(params)
	const url = `${config.BASE_API_URL}/${endpoint}?${q.toString()}`
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${config.API_READ_ACCESS_TOKEN}`,
			accept: 'application/json'
		}
	})

	return z.promise(schema).parse(response.json())
}

export const api = {
	get
}
