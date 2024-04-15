import type { HandleServerError } from '@sveltejs/kit'

export const handleError: HandleServerError = ({ error }) => {
	console.error(error)

	return {
		message: 'Internal error.'
	}
}
