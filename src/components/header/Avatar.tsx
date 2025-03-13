import { useEffect, useState, useRef } from 'react'

async function signout() {
  try {
    await fetch('/api/auth/signout')

    window.location.assign('/')
  } catch (error) {
    console.error('Sign out failed:', error)
  }
}

const UserImg = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/user')
      if (!res.ok) {
        await signout()
      }

      setUser(await res.json())
    }

    fetchUser()
  }, [])

  return (
    user && (
      <img
        src={`https://unavatar.io/${user.email}?fallback=${user.picture}`}
        alt={user.email}
        className='h-8 w-8 rounded-full border-2 border-green-four'
      />
    )
  )
}

export default function Avatar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className='relative'>
      <button id='avatar' className='block' onClick={() => setMenuOpen(!menuOpen)}>
        <UserImg />
      </button>

      {menuOpen && (
        <div className='absolute -right-2 mt-2 w-32 rounded-lg border-2 border-green-three bg-white text-end shadow-lg dark:bg-black dark:text-white'>
          <a href='/registro' className='block p-2 hover:text-blue-two'>
            Registro
          </a>
          <button onClick={signout} className='w-full p-2 text-end hover:text-blue-two'>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
