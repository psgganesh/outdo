import store from '~/store'
import axios from 'axios'

export default async (to, from, next) => {
  if (Object.is(to.params.room, null)) {
    next({ name: 'meetings.room.not.found' })
  }

  next()
}
