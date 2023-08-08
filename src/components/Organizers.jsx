import { collection, onSnapshot, query } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firestore } from '../firebase/client'

export const Organizers = () => {
  const [organizersData, setOrganizersData] = useState([])

  useEffect(() => {
    const sheduleCollection = query(collection(firestore, 'organizers'))

    onSnapshot(sheduleCollection, snapshot => {
      const organizerDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrganizersData(organizerDocs)
    })
  }, [])

  return (
    <div className='mx-auto w-full max-w-screen-md px-2'>
      <div className='grid grid-cols-3 gap-6 sm:gap-8 sm:grid-cols-4'>
        {organizersData.map(({ id, name, photoUrl }) => (
          <div className='text-center w-32 h-32' key={id}>
            <img
              className='w-24 h-24 rounded-full mx-auto border-2 border-black'
              src={photoUrl}
              alt={name}
            />
            <span className='text-white'>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
