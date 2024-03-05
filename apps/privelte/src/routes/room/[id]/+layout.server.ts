import { error } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	const room = await supabase.from('rooms').select('*').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	if (room.data.participants === room.data.slots) {
		const userId = cookies.get('userid')

		if (!userId) {
			error(403, { message: 'This room is full.' })
		}

		const user = await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.eq('room_id', room.data.id)
			.single()

		if (user.error) {
			error(403, { message: 'This room is full.' })
		}
	}

	return {
		roomId: room.data.id
	}
}
