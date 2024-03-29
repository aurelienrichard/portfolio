import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import {
	PUBLIC_SVELTEFLIX_SUPABASE_ANON_KEY,
	PUBLIC_SVELTEFLIX_SUPABASE_URL
} from '$env/static/public'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends, url: { pathname } }) => {
	depends('supabase:auth')

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SVELTEFLIX_SUPABASE_URL,
		supabaseKey: PUBLIC_SVELTEFLIX_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	})

	const {
		data: { session }
	} = await supabase.auth.getSession()

	return { supabase, session, pathname }
}
