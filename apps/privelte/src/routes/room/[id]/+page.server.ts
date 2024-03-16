import { redirect } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const userId = cookies.get('userid')
	const username = cookies.get('username')

	if (!userId || !username) {
		redirect(302, `/room/${params.id}/user`)
	}

	const user = await supabase
		.from('users')
		.select('*')
		.eq('id', userId)
		.eq('room_id', params.id)
		.single()

	if (user.error) {
		redirect(302, `/room/${params.id}/user`)
	}

	return {
		title: `${params.id} - Privelte`,
		userId,
		username
	}
}
