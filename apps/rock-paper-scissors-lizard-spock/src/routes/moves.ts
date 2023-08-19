export const moves = ['rock', 'paper', 'scissors', 'lizard', 'spock'] as const

export type Move = (typeof moves)[number]
