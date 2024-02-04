import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
import { error, redirect } from '@sveltejs/kit'
import { newRoomSchema } from '$lib/types/schemas'
import type { Actions, PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'

let currentId: string

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

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const { id, slots } = newRoomSchema.parse({
			id: form.get('id'),
			slots: form.get('slots')
		})

		if (id !== currentId) {
			error(400, { message: 'Invalid ID.' })
		}

		const { data } = await supabase.from('room').select('id').eq('id', id).single()

		if (data) {
			error(500, { message: 'Internal error.' })
		}

		await supabase.from('room').insert({ id, slots })

		throw redirect(303, `/room/${id}`)
	}
} satisfies Actions
