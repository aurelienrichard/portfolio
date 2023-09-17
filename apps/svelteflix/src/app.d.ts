// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			infinite?: boolean
			title: string
		}
		// interface Platform {}
	}
}

export {}
