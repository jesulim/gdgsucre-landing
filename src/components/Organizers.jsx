import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firestore } from '../firebase/client'

const accentColorByType = {
  4: 'red',
  3: 'yellow',
  2: 'green',
  1: 'blue'
}

export const Organizers = () => {
  const [organizersData, setOrganizersData] = useState([])

  useEffect(() => {
    const sheduleCollection = query(
      collection(firestore, 'organizers'),
      orderBy('type', 'desc')
    )

    onSnapshot(sheduleCollection, snapshot => {
      const organizerDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrganizersData(organizerDocs)
    })
  }, [])

  return (
    <div className='mx-auto w-full max-w-screen-md '>
      <div className='grid grid-cols-3 gap-x-2 gap-y-8 sm:gap-8 sm:grid-cols-4'>
        {organizersData.map(({ id, type, name, photoUrl, link }) => {
          const accentColor = accentColorByType[type]

          return (
            <a
              className={`text-white text-center w-32 h-32 hover:text-${accentColor}`}
              key={id}
              href={link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='w-24 h-24 rounded-full mx-auto border-2 border-black'
                src={photoUrl}
                alt={name}
              />
              <span>{name}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
