import { redirect, type Actions } from '@sveltejs/kit'
import { randomUUID } from 'crypto'
import { newUserSchema } from '$lib/types/schemas'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ params, cookies }) => {
	const userId = cookies.get('userid')
	const username = cookies.get('username')

	if (userId && username) {
		redirect(303, `/room/${params.id}`)
	}
}

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const form = await request.formData()
		const { username } = newUserSchema.parse({
			username: form.get('username')
		})

		const userId = randomUUID()

		cookies.set('userid', userId, {
			path: `/room/${params.id}`
		})
		cookies.set('username', username, {
			path: `/room/${params.id}`
		})

		redirect(303, `/room/${params.id}`)
	}
}
