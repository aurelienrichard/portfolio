const swap = <T>(a: number, b: number, array: T[]) => {
	const aValue = array[a]
	const bValue = array[b]
	if (aValue !== undefined && bValue !== undefined) {
		array[a] = bValue
		array[b] = aValue
	}
}

export const shuffle = <T>(array: T[]) => {
	for (let i = array.length - 1; i > 0; i -= 1) {
		const randomIndex = Math.floor(Math.random() * (i + 1))

		swap(i, randomIndex, array)
	}

	return array
}
