import { z } from 'astro:schema'

import { getFirestore } from 'firebase-admin/firestore'
import { app, bucket, COLLECTION_NAME } from 'src/firebase/server'
import sharp from 'sharp'

const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const requiredString = z.string({ invalid_type_error: 'Este campo es requerido.' })

const registerSchema = z.object({
  uid: z.string(),
  email: requiredString.email('Email inválido.'),
  firstname: requiredString.transform(x => x.trim()),
  lastname: requiredString.transform(x => x.trim()),
  phone: requiredString,
  voucher: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: 'El archivo debe ser menor a 5MB.'
    })
    .refine(file => ALLOWED_MIME_TYPES.includes(file.type), {
      message: 'Formato no permitido. Solo JPEG, PNG o WebP.'
    }),
  dietaryRestriction: z.string().nullish().default(''),
  validated: z.boolean().default(false),
  checkin: z.boolean().default(false)
})

async function compressImage(voucher: File): Promise<Buffer> {
  const buffer = Buffer.from(await voucher.arrayBuffer())

  try {
    const imageVoucher = await sharp(buffer)
      .resize(null, 1024, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer()
    return imageVoucher
  } catch {
    return buffer
  }
}

const sendToFirebase = async (input: z.infer<typeof registerSchema>) => {
  const { uid, voucher, ...data } = input

  const db = getFirestore(app).collection(COLLECTION_NAME)

  const imageVoucher = await compressImage(voucher)
  const filepath = `${COLLECTION_NAME}/${data.firstname} ${data.lastname}.jpeg`

  const file = bucket.file(filepath)
  await file.save(imageVoucher, {
    metadata: {
      contentType: voucher.type
    }
  })
  await file.makePublic()

  await db
    .doc(uid)
    .set({ voucher: `https://storage.googleapis.com/${bucket.name}/${filepath}`, ...data })
}

export { registerSchema, sendToFirebase }
