import {
  GET_USER_NOTIFICATIONS, ADD_NOTIFICATION, MARK_NOTIFICATION_AS_READ,
  PUSH_NOTIFICATION,
} from './constants'
import { emitNotify } from '../../websockets'

const initialState = {
  data: [],
  areFetched: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    // Realtime pushes
    case PUSH_NOTIFICATION:
      return {
        ...state,
        data: state.data.concat(action.notification),
      }

    // API calls results
    case `${GET_USER_NOTIFICATIONS}`:
      return {
        ...state,
        areFetched: false,
      }
    case `${GET_USER_NOTIFICATIONS}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
        areFetched: true,
      }
    case `${ADD_NOTIFICATION}_SUCCESS`:
      emitNotify({
        object: action.payload.data,
        userId: action.meta.previousAction.userId,
      })
      return state
    case `${MARK_NOTIFICATION_AS_READ}_SUCCESS`:
      return {
        ...state,
        data: state.data.map(notification => (notification.id === action.payload.data.id ? action.payload.data : notification)),
      }
    default:
      return state
  }
}
