import { describe, test, expect } from 'vitest'
import { countFormatter, dollarFormatter, getNextPage, getNumberOfColumns } from './utils'

describe('utils', () => {
	test('should return correct number of columns per screen width', () => {
		const lg = 1024
		const sm = 640

		expect(getNumberOfColumns(1280)).toBe(4)
		expect(getNumberOfColumns(lg)).toBe(4)
		expect(getNumberOfColumns(sm)).toBe(3)
		expect(getNumberOfColumns(639)).toBe(2)
	})

	test('should return correct next page number', () => {
		const movieList1 = { results: [], page: 1, total_pages: 50, total_results: 1000 }
		const movieList2 = { results: [], page: 39, total_pages: 50, total_results: 1000 }
		const movieList3 = { results: [], page: 50, total_pages: 50, total_results: 1000 }

		expect(getNextPage(movieList1)).toBe(2)
		expect(getNextPage(movieList2)).toBe(40)
		expect(getNextPage(movieList3)).toBe(null)
	})

	test('should return amount formatted in US dollar', () => {
		const twelveMillion = 12_000_000
		const threeBillion = 3_000_000_000
		const eightThousand = 8000
		const sevenHundred = 700

		expect(dollarFormatter.format(twelveMillion)).toBe('$12M')
		expect(dollarFormatter.format(threeBillion)).toBe('$3B')
		expect(dollarFormatter.format(eightThousand)).toBe('$8K')
		expect(dollarFormatter.format(sevenHundred)).toBe('$700')
	})

	test('should return amount formatted concisely', () => {
		const fourMillion = 4_000_000
		const threeThousandTwoHundred = 3200
		const twoHundred = 200

		expect(countFormatter.format(fourMillion)).toBe('4M')
		expect(countFormatter.format(threeThousandTwoHundred)).toBe('3.2K')
		expect(countFormatter.format(twoHundred)).toBe('200')
	})
})
