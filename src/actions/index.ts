import { defineAction } from 'astro:actions'
import { registerSchema, sendToFirebase } from './sendToFirebase'

export const server = {
  register: defineAction({
    accept: 'form',
    input: registerSchema,
    handler: sendToFirebase
  })
}
