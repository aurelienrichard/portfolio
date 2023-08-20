export const moves = {
	R: 'rock',
	P: 'paper',
	S: 'scissors',
	L: 'lizard',
	K: 'spock'
} as const

export type MoveKey = keyof typeof moves

export type Move = (typeof moves)[keyof typeof moves]
