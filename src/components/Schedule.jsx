import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { firestore } from '../firebase/client'

import { ScheduleCard } from './ScheduleCard'

export const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([])

  useEffect(() => {
    const sheduleCollection = query(
      collection(firestore, 'schedule'),
      orderBy('position')
    )

    onSnapshot(sheduleCollection, snapshot => {
      const scheduleDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setScheduleData(scheduleDocs)
    })
  }, [])

  return (
    <ul
      role='list'
      className='mx-auto w-full max-w-screen-lg flow-root space-y-1'
    >
      {scheduleData.map(data => (
        <li className='divide-y border rounded-lg text-white bg-white bg-opacity-20 border-gray-700 divide-gray-700 shadow'>
          <ScheduleCard key={data.id} {...data} />
        </li>
      ))}
    </ul>
  )
}
