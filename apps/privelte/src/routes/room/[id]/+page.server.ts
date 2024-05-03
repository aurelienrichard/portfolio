import { redirect } from '@sveltejs/kit'
import { supabase } from '$lib/server/supabaseServer'
import { verifyToken } from '$lib/server/auth'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const session = cookies.get('session')

	if (!session) {
		return redirect(302, `/room/${params.id}/join`)
	}

	try {
		const { userId, username } = await verifyToken(session)

		await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.eq('room_id', params.id)
			.single()
			.throwOnError()

		return {
			title: `${params.id} - Privelte`,
			userId,
			username
		}
	} catch (e) {
		console.error(e)
		return redirect(302, `/room/${params.id}/join`)
	}
}
