import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'crissval-magazin-jwt-secret-2024'
)

export async function signJWT(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyJWT(token) {
  const { payload } = await jwtVerify(token, SECRET)
  return payload
}
