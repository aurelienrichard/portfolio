import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

const schema = z.object({
	url: z.string(),
	slots: z.coerce.number().min(2).max(10)
})

export const load = (() => {
	const url = uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		separator: '-',
		style: 'lowerCase',
		length: 3
	})

	return {
		url
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const { url, slots } = schema.parse({
			url: data.get('url'),
			slots: data.get('slots')
		})

		console.log({ url, slots })
	}
}
