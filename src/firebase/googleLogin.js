export default async function googleLogin(redirectPath = '/') {
  const { GoogleAuthProvider, signInWithPopup, getAuth } = await import('firebase/auth')
  const { app } = await import('./client')

  const auth = getAuth(app)
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
