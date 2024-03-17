import { H } from '@highlight-run/cloudflare'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	// @ts-expect-error cloudflare types missing
	H.init(event.request, { HIGHLIGHT_PROJECT_ID: 'memjvzye' }, event.platform.context)

	const response = await resolve(event)

	H.sendResponse(response)

	return response
}
