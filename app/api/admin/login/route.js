import { signJWT } from '@/lib/jwt'
import { cookies } from 'next/headers'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'cristiusa98@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smecherul1'

export async function POST(request) {
  const { email, password } = await request.json()

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Email sau parolă incorecte.' }, { status: 401 })
  }

  const token = await signJWT({ email, role: 'admin' })
  const cookieStore = await cookies()
  cookieStore.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return Response.json({ ok: true })
}
