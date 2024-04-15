import { animals } from '$lib/generate-room-id/animals'
import { adjectives } from '$lib/generate-room-id/adjectives'

const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

export const generateRoomId = () => {
	const adjective = adjectives[getRandomNumber(adjectives.length)]
	const animal = animals[getRandomNumber(animals.length)]
	const number = getRandomNumber(1000)

	return `${adjective}-${animal}-${number}`
}
