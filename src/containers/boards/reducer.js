import { GET_ALL_BOARDS, ADD_BOARD } from './constants'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_BOARDS}_SENT`:
      return state
    case `${GET_ALL_BOARDS}_SUCCESS`:
      return action.payload.data
    case `${GET_ALL_BOARDS}_ERROR`:
      return state
    case `${ADD_BOARD}_SENT`:
      return state
    case `${ADD_BOARD}_SUCCESS`:
      return state.concat(action.payload.data)
    case `${ADD_BOARD}_ERROR`:
      return state
    default:
      return state
  }
}
