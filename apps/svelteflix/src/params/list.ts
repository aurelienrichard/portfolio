import { views } from '$lib/views'

export const match = (param: string) => param in views
