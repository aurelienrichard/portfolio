import { redirect, fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const load = () => {
	throw redirect(307, '/')
}

export const actions: Actions = {
	async default({ locals: { supabase } }) {
		const { error } = await supabase.auth.signOut()

		if (error)
			return fail(error.status ?? 500, {
				message: error.message
			})

		throw redirect(303, '/')
	}
}
