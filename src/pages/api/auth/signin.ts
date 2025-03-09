import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'

import { app } from '../../../firebase/server'

const expiresIn = 1000 * 60 * 60 * 24 * 14
const auth = getAuth(app)

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  /* Get token from request headers */
  const idToken = request.headers.get('Authorization')?.split('Bearer ')[1]
  if (!idToken) {
    return new Response('No token found', { status: 401 })
  }

  /* Verify id token */
  try {
    await auth.verifyIdToken(idToken)
  } catch (error) {
    return new Response(`Invalid token ${error}`, { status: 401 })
  }

  /* Create and set session cookie for 14 days */
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
  cookies.set('__session', sessionCookie, {
    path: '/'
  })

  return new Response('Success', { status: 200 })
}
