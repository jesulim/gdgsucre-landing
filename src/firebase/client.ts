import { initializeApp, getApps, getApp } from 'firebase/app'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = getApps().length
  ? getApp('gdgsucre-events')
  : initializeApp(firebaseConfig, 'gdgsucre-events')

export { app }
