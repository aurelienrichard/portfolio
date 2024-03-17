import { H } from 'highlight.run'

H.init('memjvzye', {
	environment: 'production',
	tracingOrigins: true,
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true
	}
})
