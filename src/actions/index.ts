import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { getFirestore } from 'firebase-admin/firestore'
import { app } from 'src/firebase/server'

const schema = z.object({
  uid: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  ci: z.string(),
  cu: z.string().nullish().default(''),
  reasonToParticipate: z.string().nullish().default(''),
  dietaryRestriction: z.string().nullish().default('')
})

const sendToFirestore = async input => {
  const { uid, ...data } = input

  data.validated = false
  data.checkin = false
  data.lunch = false

  const db = getFirestore(app).collection('registro-devfest2024')
  await db.doc(uid).set(data)
}

export const server = {
  register: defineAction({
    accept: 'form',
    input: schema,
    handler: sendToFirestore
  })
}
