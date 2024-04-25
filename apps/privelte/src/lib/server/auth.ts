import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { createSecretKey } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { PRIVELTE_JWT_SECRET } from '$env/static/private'

const secret = createSecretKey(Buffer.from(PRIVELTE_JWT_SECRET, 'hex'))
const algorithm = 'HS256'
const twoMinutes = 1000 * 60 * 2

interface User {
	userId: string
	username: string
}

const signToken = async (payload: JWTPayload) =>
	new SignJWT(payload)
		.setProtectedHeader({ alg: algorithm })
		.setIssuedAt()
		.setExpirationTime('2 minutes from now')
		.sign(secret)

export const createToken = async (payload: JWTPayload) => {
	const jwt = await signToken(payload)
	const expires = new Date(Date.now() + twoMinutes)

	return { jwt, expires }
}

export const verifyToken = async (token: string | undefined) => {
	try {
		if (!token) throw Error('No token provided.')

		const { payload } = await jwtVerify<User>(token, secret, {
			algorithms: [algorithm]
		})
		return payload
	} catch {
		throw Error('Invalid token.')
	}
}
