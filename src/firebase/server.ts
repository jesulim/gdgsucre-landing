import admin, { type ServiceAccount } from 'firebase-admin'
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const COLLECTION_NAME = 'registro-iwd2025'

const serviceAccount = {
  type: 'service_account',
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL
}

let app = getApps().length > 0 ? getApp()[0] : null
let db = null
let bucket = null

function getFirebaseAdmin() {
  if (!app) {
    app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      storageBucket: 'gs://gdgsucre-events.appspot.com'
    })

    db = getFirestore(app)
    bucket = admin.storage().bucket()
  }

  return { app, db, bucket }
}

export { getFirebaseAdmin, COLLECTION_NAME }
