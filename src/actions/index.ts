import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { getFirestore } from 'firebase-admin/firestore'
import { app } from 'src/firebase/server'

export const server = {
  register: defineAction({
    accept: 'form',
    input: z.object({
      uid: z.string(),
      firstname: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      phone: z.string(),

      dietaryRestriction: z
        .string()
        .optional()
        .transform(val => val || '')
    }),
    handler: async input => {
      const { uid, ...data } = input

      const db = getFirestore(app).collection('registro-devfest2024')
      await db.doc(uid).set(data)
    }
  })
}
