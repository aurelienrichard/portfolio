import { error } from '@sveltejs/kit'
import { randomUUID } from 'crypto'
import type { PageServerLoad } from './$types'
import { supabase } from '$lib/server/supabaseServer'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const room = await supabase.from('rooms').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	const cookieName = `privelte_${params.id}_id`
	const userId = cookies.get(cookieName)

	if (!userId) {
		const uuid = randomUUID()
		cookies.set(cookieName, uuid, { path: '/' })
	}

	return {
		room: room.data,
		userId: userId ?? cookies.get(cookieName)!
	}
}
