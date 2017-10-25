import { GET_ALL_BOARDS } from './constants'

const initialState = {
  data: [],
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_BOARDS}`:
      return {
        ...state,
        isFetching: true,
      }
    case `${GET_ALL_BOARDS}_SUCCESS`:
      return {
        data: action.payload.data,
        isFetching: false,
      }
    case `${GET_ALL_BOARDS}_ERROR`:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
