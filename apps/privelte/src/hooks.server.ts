import { H } from '@highlight-run/cloudflare'
import type { Handle, HandleServerError } from '@sveltejs/kit'

export const handle: Handle = ({ event, resolve }) => {
	// @ts-expect-error cloudflare types missing
	H.init(event.request, { HIGHLIGHT_PROJECT_ID: 'memjvzye' }, event.platform?.context)

	return resolve(event)
}

export const handleError: HandleServerError = ({ error }) => {
	H.consumeError(error as Error)
}
