import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ params, cookies }) => {
	const userId = cookies.get('userid')
	const username = cookies.get('username')

	if (!userId || !username) {
		redirect(302, `/room/${params.id}/user`)
	}

	return {
		userId,
		username
	}
}
