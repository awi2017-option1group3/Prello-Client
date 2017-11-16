import { GET_ALL_ATTACHMENTS_IN_CARD, REMOVE_ATTACHMENT } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_ATTACHMENTS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${REMOVE_ATTACHMENT}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}
