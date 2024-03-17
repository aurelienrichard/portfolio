import { H } from 'highlight.run'

H.init('memjvzye', {
	environment: 'production',
	version: 'commit:abcdefg12345',
	tracingOrigins: true,
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
		urlBlocklist: []
	}
})
