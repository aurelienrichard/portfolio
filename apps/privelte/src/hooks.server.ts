import { H } from '@highlight-run/cloudflare'
import type { Handle, HandleServerError, HandleFetch } from '@sveltejs/kit'
import type { ExecutionContext } from '@cloudflare/workers-types'
import { PUBLIC_PRIVELTE_HIGHLIGHT_PROJECT_ID as HIGHLIGHT_PROJECT_ID } from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
	const { context } = event.platform as { context: ExecutionContext }

	H.init(event.request, { HIGHLIGHT_PROJECT_ID }, context)

	const response = await resolve(event)

	H.sendResponse(response)

	return response
}

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const { context } = event.platform as { context: ExecutionContext }

	H.init(event.request, { HIGHLIGHT_PROJECT_ID }, context)

	const response = await fetch(request)

	H.sendResponse(response)

	return response
}

export const handleError: HandleServerError = ({ error, event }) => {
	const { context } = event.platform as { context: ExecutionContext }

	H.init(event.request, { HIGHLIGHT_PROJECT_ID }, context)

	H.consumeError(error as Error)

	return { message: 'Internal error.' }
}
