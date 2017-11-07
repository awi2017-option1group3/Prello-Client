import { CLEAN_STATE, GET_ALL_LABELS_FOR_BOARD } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case `${GET_ALL_LABELS_FOR_BOARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}
