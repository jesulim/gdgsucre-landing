import { z } from 'astro:schema'
import sharp from 'sharp'

import { getFirebaseAdmin, COLLECTION_NAME } from 'src/firebase/server'

const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const requiredString = z.string({ invalid_type_error: 'Este campo es requerido.' })

const registerSchema = z.object({
  uid: z.string(),
  email: requiredString.email('Email inválido.'),
  firstname: requiredString.transform(x => x.trim()),
  lastname: requiredString.transform(x => x.trim()),
  phone: requiredString,
  package: z.enum(['Entrada libre', 'SheStarts', 'SheCodes', 'SheLeads']),
  voucher: z
    .instanceof(File)
    .optional()
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: 'El archivo debe ser menor a 5MB.'
    })
    .refine(file => !file.size || ALLOWED_MIME_TYPES.includes(file.type), {
      message: 'Formato no permitido. Solo JPEG, PNG o WebP.'
    }),
  dietaryRestriction: z.string().nullish().default(''),
  role: z.string().default('Participante'),
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
  const { db, bucket } = getFirebaseAdmin()

  if (voucher.size > 0) {
    const imageVoucher = await compressImage(voucher)
    const filepath = `${COLLECTION_NAME}/${data.firstname} ${data.lastname}.jpeg`

    const file = bucket.file(filepath)
    await file.save(imageVoucher, {
      metadata: {
        contentType: voucher.type
      }
    })

    await file.makePublic()
    data.voucher = `https://storage.googleapis.com/${bucket.name}/${filepath}`
  }

  await db.collection(COLLECTION_NAME).doc(uid).set(data)
}

export { registerSchema, sendToFirebase }
