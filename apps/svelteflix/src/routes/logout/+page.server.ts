import { redirect, fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const load = () => {
	redirect(307, '/')
}

export const actions: Actions = {
	async default({ locals: { supabase } }) {
		const { error } = await supabase.auth.signOut()

		if (error) fail(error.status ?? 500, { message: error.message })

		redirect(303, '/')
	}
}
