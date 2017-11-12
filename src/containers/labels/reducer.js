import { GET_ALL_LABELS_IN_CARD, ADD_LABEL_IN_CARD, REMOVE_LABEL_IN_CARD } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_LABELS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${ADD_LABEL_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${REMOVE_LABEL_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}
