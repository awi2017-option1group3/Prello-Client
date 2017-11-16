import { GET_USER_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ } from './constants'

const initialState = {
  data: [],
  areFetched: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
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
    case `${MARK_NOTIFICATION_AS_READ}_SUCCESS`:
      return {
        ...state,
        data: state.data.map(notification => (notification.id === action.payload.data.id ? action.payload.data : notification)),
      }
    default:
      return state
  }
}
