import { GET_ALL_COMMENTS_IN_CARD, ADD_COMMENT } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_COMMENTS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${ADD_COMMENT}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    default:
      return state
  }
}
