import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firestore } from '../firebase/client'

const ScheduleCard = ({ type, schedule, title, name, technologyType }) => {
  const textColor = type === 'Actividad' ? 'text-green' : 'text-yellow'

  return (
    <div className='mx-auto w-full max-w-screen-lg p-4 border rounded-lg shadow sm:p-8 bg-white bg-opacity-20 border-gray-700'>
      <div className='flow-root'>
        <ul role='list' className='divide-y divide-gray-700'>
          <li className='text-white'>
            <div className='flex space-x-1 mb-2'>
              {type !== 'Actividad' && (
                <span className='text-lg ml-auto bg-blue rounded-full px-2'>
                  {type}
                </span>
              )}
              {technologyType && (
                <span className='text-lg  bg-green rounded-full px-2'>
                  {technologyType}
                </span>
              )}
            </div>
            <div className='flex items-center space-x-4'>
              <span className='font-bold text-2xl sm:text-5xl'>{schedule}</span>
              <div className='flex-1 overflow-hidden'>
                <p className={'text-xl md:text-2xl font-bold ' + textColor}>
                  {title}
                </p>
                <p className='text-md md:text-lg truncate text-white'>{name}</p>
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