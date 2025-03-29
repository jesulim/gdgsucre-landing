import type { APIRoute } from 'astro'

import { getFirebaseAdmin, COLLECTION_NAME } from 'src/firebase/server'

export const PUT: APIRoute = async ({ request }) => {
  const { db } = getFirebaseAdmin()
  const { uid, ...data } = await request.json()
  await db.collection(COLLECTION_NAME).doc(uid).update(data)

  return new Response(JSON.stringify({ message: 'Registration updated' }))
}
