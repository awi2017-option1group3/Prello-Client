import {
  ADD_ASSIGNEE_TO_CARD, ADD_RESPONSIBLE_TO_CARD, GET_ALL_ASSIGNEES_IN_CARD, GET_RESPONSIBLE_FOR_CARD,
  REMOVE_ASSIGNEE_FROM_CARD, REMOVE_RESPONSIBLE_FROM_CARD } from './constants'

const initialState = {
  data: [],
  responsible: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_ASSIGNEES_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${GET_RESPONSIBLE_FOR_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
      }
    case `${ADD_ASSIGNEE_TO_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${ADD_RESPONSIBLE_TO_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
      }
    case `${REMOVE_ASSIGNEE_FROM_CARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(assignee => assignee.id !== action.meta.previousAction.assigneeId),
      }
    case `${REMOVE_RESPONSIBLE_FROM_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: null,
      }
    default:
      return state
  }
}
