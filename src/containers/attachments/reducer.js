import { GET_ALL_ATTACHMENTS_IN_CARD, REMOVE_ATTACHMENT_IN_CARD } from './constants'

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_ATTACHMENTS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        attachments: action.payload.data,
      }
    case `${REMOVE_ATTACHMENT_IN_CARD}_SUCCESS`:
      return {
        ...state,
        attachments: state.attachments.filter(attachment => attachment.id !== action.meta.previousAction.attachmentId),
      }
    default:
      return state
  }
}
