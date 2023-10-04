import type { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database } from './DatabaseDefinitions'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
			pathname?: string
			infinite?: boolean
			title?: string
		}
		// interface Platform {}
	}
}

export {}
