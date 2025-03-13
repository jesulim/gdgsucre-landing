import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'

import { getFirebaseAdmin } from '../../../firebase/server'

export const GET: APIRoute = async ({ cookies }) => {
  const { app } = getFirebaseAdmin()
  const auth = getAuth(app)
  const sessionCookie = cookies.get('__session')?.value

  try {
    const user = await auth.verifySessionCookie(sessionCookie)
    return new Response(JSON.stringify(user))
  } catch {
    return new Response('Session expired', { status: 403 })
  }
}
