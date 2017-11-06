import { CLEAN_STATE, GET_ONE_USER, GET_ALL_USERS } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case `${GET_ALL_USERS}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${GET_ONE_USER}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data,
      }
    default:
      return state
  }
}
