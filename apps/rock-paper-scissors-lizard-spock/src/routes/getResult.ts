import type { MoveKey } from './moves'

export type Result = 'you win' | 'you lose' | 'draw'
export type Pair = [MoveKey, MoveKey]

export const rules: Record<MoveKey, Pair> = {
	R: ['S', 'L'],
	P: ['R', 'K'],
	S: ['P', 'L'],
	L: ['P', 'K'],
	K: ['S', 'R']
}

export const getResult = (playerMove: MoveKey, computerMove: MoveKey): Result => {
	if (rules[playerMove].includes(computerMove)) return 'you win'
	if (rules[computerMove].includes(playerMove)) return 'you lose'
	return 'draw'
}
