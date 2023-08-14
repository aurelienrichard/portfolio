export interface Level {
	label: string
	size: number
	duration: number
}

export const levels: Level[] = [
	{
		label: 'easy',
		size: 4,
		duration: 60 * 1000
	},
	{
		label: 'medium',
		size: 6,
		duration: 150 * 1000
	},
	{
		label: 'hard',
		size: 8,
		duration: 300 * 1000
	}
]
