import { db, COLLECTION_NAME } from 'src/firebase/server'

import type { APIRoute } from 'astro'

export const PUT: APIRoute = async ({ request }) => {
  const { uid, ...data } = await request.json()
  await db.collection(COLLECTION_NAME).doc(uid).update(data)
  return new Response(JSON.stringify({ message: 'Registration updated' }))
}
