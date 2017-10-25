import { GET_ALL_BOARDS } from './constants'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_BOARDS}_SENT`:
      return state
    case `${GET_ALL_BOARDS}_SUCCESS`:
      return action.payload.data
    case `${GET_ALL_BOARDS}_ERROR`:
      return state
    default:
      return state
  }
}
