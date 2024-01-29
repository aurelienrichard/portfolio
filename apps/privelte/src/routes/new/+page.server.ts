import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
import { z } from 'zod'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

let currentId: string

const schema = z.object({
	id: z.string(),
	slots: z.coerce.number().min(2).max(10)
})

export const load = (() => {
	const id = uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		separator: '-',
		style: 'lowerCase',
		length: 3
	})

	currentId = id

	return {
		id
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const { id, slots } = schema.parse({
			id: data.get('id'),
			slots: data.get('slots')
		})

		console.log({ id, slots })

		if (id !== currentId) {
			error(400, { message: 'Invalid ID' })
		}

		// check if id already exists
		// if it does, error 500

		// create room with id and slots

		throw redirect(303, `/room/${id}`)
	}
}
