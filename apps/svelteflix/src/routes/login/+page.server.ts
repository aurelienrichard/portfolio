import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

const schema = z.object({
	email: z.string().email()
})

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession()

	if (session) {
		redirect(303, '/watchlist')
	}

	return {
		title: 'Log in'
	}
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await request.formData()

		const { email } = schema.parse({
			email: form.get('email')
		})

		const { error } = await supabase.auth.signInWithOtp({ email })

		if (error) fail(error.status ?? 500, { message: error.message })

		redirect(303, '/')
	}
}
