import { error } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ params }) => {
	const room = await supabase.from('rooms').select('id, slots').eq('id', params.id).single()

	if (room.error) {
		error(404, { message: 'This room does not exist.' })
	}

	return {
		room: room.data
	}
}
