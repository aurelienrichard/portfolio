import { redirect, type Actions, error } from '@sveltejs/kit'
import { createToken, verifyToken } from '$lib/server/auth'
import { newUserSchema } from '$lib/types/schemas'
import { supabase } from '$lib/server/supabaseServer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const session = cookies.get('session')

	try {
		const { userId } = await verifyToken(session)

		await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.eq('room_id', params.id)
			.single()
			.throwOnError()
	} catch {
		return { title: 'Join - Privelte' }
	}

	return redirect(303, `/room/${params.id}`)
}

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const room = await supabase.from('rooms').select('*').eq('id', params.id!).single()

		if (room.error) {
			return error(404, { message: 'This room does not exist.' })
		}

		const participants = room.data.participants ?? 0

		if (participants === room.data.slots) {
			return error(403, { message: 'This room is full.' })
		}

		const form = await request.formData()

		try {
			const { username } = newUserSchema.parse({
				username: form.get('username')
			})

			const user = await supabase
				.from('users')
				.insert({ room_id: room.data.id })
				.select()
				.single()
				.throwOnError()

			const { jwt, expires } = await createToken({ userId: user.data!.id, username })

			cookies.set('session', jwt, {
				path: `/room/${room.data.id}`,
				expires
			})
		} catch {
			return error(500, { message: 'Internal error.' })
		}

		return redirect(303, `/room/${params.id}`)
	}
}