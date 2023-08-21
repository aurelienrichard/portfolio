import type { MoveKey } from './moves'
import { moves } from './moves'

const moveKeys = Object.keys(moves) as MoveKey[]

export const getComputerMove = () => {
	const randomMove = Math.floor(Math.random() * moveKeys.length)

	return moveKeys[randomMove] as MoveKey
}
