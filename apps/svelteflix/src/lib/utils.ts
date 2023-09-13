import { PUBLIC_MEDIA_BASE_API_URL } from '$env/static/public'

export const getMediaURL = (path: string, width: number) => {
	const url = `${PUBLIC_MEDIA_BASE_API_URL}/w${width}${path}`

	return url
}

export const getNumberOfColumns = (width: number) => {
	if (width >= 1024) return 4
	if (width >= 640) return 3
	return 2
}
