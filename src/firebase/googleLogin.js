import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from './client'

export default async function googleLogin(redirectPath = '/') {
  const userCredential = await signInWithPopup(auth, new GoogleAuthProvider())
  const idToken = await userCredential.user.getIdToken()

  const res = await fetch('/api/auth/signin', {
    headers: {
      Authorization: `Bearer ${idToken}`,
      urlRedirect: '/registro'
    }
  })

  if (res.ok) {
    window.location.assign(redirectPath)
  }
}
