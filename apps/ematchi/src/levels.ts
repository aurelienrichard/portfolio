import { emojis } from './emojis'

const { easy } = emojis

interface Level {
	label: string
	size: number
	duration: number
	emojis: string[]
}

export const levels: Level[] = [
	{
		label: 'easy',
		size: 4,
		duration: 60 * 1000,
		emojis: easy
	}
]
