import { getFirebaseAdmin, COLLECTION_NAME } from '../../firebase/server'

interface Registration {
  uid: string
  picture: string
  firstname: string
  lastname: string
  email: string
  phone: string
  ci: string
  cu: string
  dietaryRestriction: string
  validated: boolean
  role: string
}

enum RegistrationStatus {
  Pending = 'PENDING',
  Open = 'OPEN',
  Closed = 'CLOSED'
}

async function fetchRegistration(user): Promise<Registration | null> {
  try {
    const { db } = getFirebaseAdmin()
    const doc = await db.collection(COLLECTION_NAME).doc(user.uid).get()

    return {
      uid: user.uid,
      email: user.email,
      picture: user.picture,
      ...doc.data()
    } as Registration
  } catch (error) {
    console.error(error)
    return null
  }
}

function getRegistrationStatus(
  registration: Registration,
  registrationClosed = false
): RegistrationStatus {
  if (registration.validated === false) {
    return RegistrationStatus.Pending
  }

  return registrationClosed ? RegistrationStatus.Closed : RegistrationStatus.Open
}

export { fetchRegistration, getRegistrationStatus, RegistrationStatus }
export type { Registration }
