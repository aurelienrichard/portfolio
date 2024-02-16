import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
import { error, redirect } from '@sveltejs/kit'
import { newRoomSchema } from '$lib/types/schemas'
import type { Actions, PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'

let currentId: string

export const load: PageServerLoad = () => {
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
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const { id, slots } = newRoomSchema.parse({
			id: form.get('id'),
			slots: form.get('slots')
		})

		if (id !== currentId) {
			error(400, { message: 'Invalid ID.' })
		}

		const { data } = await supabase.from('rooms').select('id').eq('id', id).single()

		if (data) {
			error(500, { message: 'Internal error.' })
		}

		const channel = supabase.channel(id)

		const subscribeToChannel = new Promise<void>((resolve, reject) => {
			channel.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					resolve()
				} else {
					reject(new Error())
				}
			})
		})

		try {
			await subscribeToChannel
			await supabase.from('rooms').insert({ id, slots })
		} catch {
			await supabase.removeChannel(channel)
			error(500, 'Internal error.')
		}

		redirect(303, `/room/${id}`)
	}
}
