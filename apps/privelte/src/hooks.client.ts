import { H } from 'highlight.run'
import { PUBLIC_PRIVELTE_HIGHLIGHT_PROJECT_ID } from '$env/static/public'

H.init(PUBLIC_PRIVELTE_HIGHLIGHT_PROJECT_ID, {
	tracingOrigins: true,
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true
	}
})
