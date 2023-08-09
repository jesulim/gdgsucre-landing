export const ActivityCard = ({ schedule, title }) => (
  <div className='flex items-center h-12 space-x-4 text-white text-xl sm:text-2xl  px-4 sm:p-8'>
    <h3 className='font-bold'>{schedule}</h3>
    <p className={'font-semibold text-green'}>{title}</p>
  </div>
)
