import { CLEAN_STATE,
  GET_ALL_COMMENTS_IN_CARD, GET_ALL_LABELS_IN_CARD, GET_ALL_ASSIGNEES_IN_CARD, GET_RESPONSIBLE_FOR_CARD, GET_ONE_CARD,
  ADD_COMMENT, ADD_LABEL, ADD_ASSIGNEE, ADD_RESPONSIBLE,
  UPDATE_DUE_DATE, UPDATE_DESC,
  REMOVE_ASSIGNEE, REMOVE_LABEL } from './constants'

const initialState = {
  title: '',
  desc: '',
  rank: '',
  listId: '',
  cardResponsible: null,
  dueComplete: null,
  labels: [],
  assignees: [],
  comments: [],
  isFetchingUsers: false,
  isAddingComment: false,
  isAddingAssignee: false,
  isAddingResponsible: false,
  isAddingLabel: false,
  isAddingDueDate: false,
  isAddingDesc: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case `${GET_ALL_COMMENTS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        comments: action.payload.data,
      }
    case `${GET_ALL_LABELS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        labels: action.payload.data,
      }
    case `${GET_ALL_ASSIGNEES_IN_CARD}_SUCCESS`:
      return {
        ...state,
        assignees: action.payload.data,
      }
    case `${GET_RESPONSIBLE_FOR_CARD}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
      }
    case `${GET_ONE_CARD}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data,
      }
    case `${ADD_COMMENT}_SUCCESS`:
      return {
        ...state,
        comments: state.comments.concat(action.payload.data),
        isAddingComment: true,
      }
    case `${ADD_COMMENT}_FAIL`:
      return {
        ...state,
        isAddingComment: false,
      }
    case `${ADD_LABEL}_SUCCESS`:
      return {
        ...state,
        labels: state.labels.concat(action.payload.data),
        isAddingLabel: true,
      }
    case `${ADD_LABEL}_FAIL`:
      return {
        ...state,
        isAddingLabel: false,
      }
    case `${ADD_ASSIGNEE}_SUCCESS`:
      return {
        ...state,
        assignees: state.assignees.concat(action.payload.data),
        isAddingAssignee: true,
      }
    case `${ADD_ASSIGNEE}_FAIL`:
      return {
        ...state,
        isAddingAssignee: false,
      }
    case `${ADD_RESPONSIBLE}_SUCCESS`:
      return {
        ...state,
        responsible: action.payload.data,
        isAddingResponsible: true,
      }
    case `${ADD_RESPONSIBLE}_FAIL`:
      return {
        ...state,
        isAddingResponsible: false,
      }
    case `${UPDATE_DESC}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data,
        isAddingDesc: true,
      }
    case `${UPDATE_DESC}_FAIL`:
      return {
        ...state,
        isAddingDesc: false,
      }
    case `${UPDATE_DUE_DATE}_SUCCESS`:
      return {
        ...state,
        dueComplete: action.payload.data,
        isAddingDueDate: false,
      }
    case `${UPDATE_DUE_DATE}_FAIL`:
      return {
        ...state,
        isAddingDueDate: false,
      }
    case `${REMOVE_ASSIGNEE}_SUCCESS`:
      return {
        ...state,
      }
    case `${REMOVE_LABEL}_SUCCESS`:
      return {
        ...state,
      }
    default:
      return state
  }
}
