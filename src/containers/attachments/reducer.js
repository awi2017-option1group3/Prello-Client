import { GET_ALL_ATTACHMENTS_IN_CARD, ADD_ATTACHMENT, REMOVE_ATTACHMENT } from './constants'

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
    case `${ADD_ATTACHMENT}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${REMOVE_ATTACHMENT}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(attachment => attachment.id !== action.meta.previousAction.attachmentId),
      }
    default:
      return state
  }
}
