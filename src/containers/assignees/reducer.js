import {
  ADD_ASSIGNEE_TO_CARD, ADD_RESPONSIBLE_TO_CARD, GET_ALL_ASSIGNEES_IN_CARD, GET_RESPONSIBLE_FOR_CARD,
  REMOVE_ASSIGNEE_FROM_CARD, REMOVE_RESPONSIBLE_FROM_CARD } from './constants'

const initialState = {
  assignees: [],
  responsible: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ASSIGNEES_IN_CARD:
      return {
        ...state,
      }
    case `${GET_ALL_ASSIGNEES_IN_CARD}_SUCCESS`:
      return {
        ...state,
        assignees: action.payload.data,
      }
    case GET_RESPONSIBLE_FOR_CARD:
      return {
        ...state,
      }
    case `${GET_RESPONSIBLE_FOR_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
      }
    case `${ADD_ASSIGNEE_TO_CARD}_SUCCESS`:
      return {
        ...state,
        assignees: action.payload.data,
      }
    case `${ADD_ASSIGNEE_TO_CARD}_FAIL`:
      return {
        ...state,
      }
    case `${ADD_RESPONSIBLE_TO_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
      }
    case `${ADD_RESPONSIBLE_TO_CARD}_FAIL`:
      return {
        ...state,
      }
    case `${REMOVE_ASSIGNEE_FROM_CARD}_SUCCESS`:
      return {
        ...state,
        assignees: action.payload.data,
      }
    case `${REMOVE_RESPONSIBLE_FROM_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
      }
    default:
      return state
  }
}