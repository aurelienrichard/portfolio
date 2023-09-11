import { PUBLIC_MEDIA_BASE_API_URL } from '$env/static/public'

export const getMediaURL = (path: string, width: number) => {
	const url = `${PUBLIC_MEDIA_BASE_API_URL}/w${width}${path}`

	return url
}
