import { ActivityCard } from './ScheduleCards/ActivityCard'
import { SpeakerCard } from './ScheduleCards/SpeakerCard'

export const ScheduleCard = props => {
  if (props.type === 'Actividad') {
    return <ActivityCard {...props} />
  }
  return <SpeakerCard {...props} />
}
