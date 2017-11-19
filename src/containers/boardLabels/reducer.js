import { GET_ALL_LABELS_IN_BOARD, ADD_LABEL, REMOVE_LABEL } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_LABELS_IN_BOARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${ADD_LABEL}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${REMOVE_LABEL}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(label => label.id !== action.meta.previousAction.labelId),
      }
    default:
      return state
  }
}
