import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firestore } from '../firebase/client'

const ScheduleCard = ({ type, schedule, title, name }) => {
  const textColor = type === 'Actividad' ? 'text-green' : 'text-yellow'

  return (
    <div className='mx-auto w-full max-w-screen-lg p-4 border rounded-lg shadow sm:p-8 bg-white bg-opacity-20 border-gray-700'>
      <div className='flow-root'>
        <ul role='list' className='divide-y divide-gray-700'>
          <li className='py-2 sm:py-4'>
            <div className='flex items-center space-x-4'>
              <div className='inline-flex items-center font-bold text-2xl text-white sm:text-5xl'>
                {schedule}
              </div>
              <div className='flex-1 overflow-hidden'>
                <p className={'text-2xl font-bold truncate ' + textColor}>
                  {title}
                </p>
                <p className='text-md truncate text-white'>{name}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

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
    <div className='space-y-1'>
      {scheduleData.map(data => (
        <ScheduleCard key={data.id} {...data} />
      ))}
    </div>
  )
}
