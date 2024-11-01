import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { getFirestore } from 'firebase-admin/firestore'
import { app } from 'src/firebase/server'

const requiredString = z.string({ invalid_type_error: 'Este campo es requerido.' })

const schema = z.object({
  uid: z.string(),
  firstname: requiredString.transform(x => x.trim()),
  lastname: requiredString.transform(x => x.trim()),
  email: requiredString.email('Email inválido.'),
  phone: requiredString,
  ci: requiredString,
  cu: z.string().nullish().default(''),
  reasonToParticipate: requiredString.transform(x => x.trim()),
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
