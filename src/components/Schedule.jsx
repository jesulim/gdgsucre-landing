import scheduleData from '../data/schedule.json'
import { ScheduleCard } from './ScheduleCard'

export const Schedule = () => (
  <ul
    role='list'
    className='mx-auto w-full max-w-screen-lg flow-root space-y-1'
  >
    {scheduleData.map(data => (
      <li
        key={data.id}
        className='divide-y border rounded-lg text-white bg-white bg-opacity-20 border-gray-700 divide-gray-700 shadow'
      >
        <ScheduleCard {...data} />
      </li>
    ))}
  </ul>
)
