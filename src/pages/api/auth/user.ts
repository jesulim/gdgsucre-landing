import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'

import { app } from '../../../firebase/server'

const auth = getAuth(app)

export const GET: APIRoute = async ({ cookies }) => {
  const sessionCookie = cookies.get('__session')?.value

  try {
    const user = await auth.verifySessionCookie(sessionCookie)
    return new Response(JSON.stringify(user))
  } catch {
    return new Response('Session expired', { status: 403 })
  }
}
