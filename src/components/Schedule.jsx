import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firestore } from '../firebase/client'

const bgTechnologies = {
  Cloud: 'bg-red',
  Web: 'bg-blue',
  IA: 'bg-yellow px-4',
  Mobile: 'bg-green'
}

const ScheduleCard = ({
  type,
  schedule,
  photoUrl,
  title,
  name,
  description,
  technologyType
}) => {
  const [clampText, setClampText] = useState(true)

  const revealText = () => {
    setClampText(!clampText)
  }

  const textColor = type === 'Actividad' ? 'text-green' : 'text-yellow'

  return (
    <div className='mx-auto w-full max-w-screen-lg py-2 px-4 border rounded-lg shadow sm:p-8 bg-white bg-opacity-20 border-gray-700 transition-[height]'>
      <div className='flow-root'>
        <ul role='list' className='divide-y divide-gray-700'>
          <li className='text-white'>
            <div className='flex items-start space-x-4'>
              <div className='flex flex-col items-center justify-center space-y-3'>
                <h3 className='text-2xl font-bold'>{schedule}</h3>
                {photoUrl && (
                  <img
                    className='w-12 h-12 rounded-full'
                    src={photoUrl}
                    alt={name}
                  />
                )}
              </div>
              <div className='flex-1 cursor-pointer' onClick={revealText}>
                <p
                  className={
                    'text-xl md:text-2xl font-bold line-clamp-3 ' + textColor
                  }
                >
                  {title}
                </p>
                <p className='text-md md:text-lg font-medium text-white opacity-80'>
                  {name}
                </p>
                <p
                  className={
                    'text-lg md:text-xl text-white ' +
                    (clampText && 'line-clamp-3')
                  }
                >
                  {description}
                </p>
              </div>
            </div>
            <div className='flex space-x-1'>
              {type !== 'Actividad' && (
                <span
                  className={
                    'bg-white text-black border-2 border-black mt-2 text-sm md:text-lg ml-auto rounded-lg px-2'
                  }
                >
                  {type}
                </span>
              )}
              {technologyType && (
                <span
                  className={
                    'mt-2 px-2 text-sm md:text-lg text-black border-2 border-black rounded-full ' +
                    bgTechnologies[technologyType]
                  }
                >
                  {technologyType}
                </span>
              )}
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
