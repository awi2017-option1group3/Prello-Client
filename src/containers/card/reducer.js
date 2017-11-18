import {
  CLEAN_STATE,
  GET_ALL_COMMENTS_IN_CARD, GET_ONE_CARD,
  ADD_COMMENT, ADD_LABEL,
  UPDATE_DUE_DATE, UPDATE_DESC,
} from './constants'

const initialState = {
  title: '',
  desc: '',
  rank: '',
  listId: '',
  cardResponsible: null,
  dueComplete: null,
  labels: [],
  assigneesIds: [],
  comments: [],
  isFetchingAssignees: false,
  isFetchingLabels: false,
  isFetchingResponsible: false,
  isFetchingComments: false,
  isAddingComment: false,
  isAddingAssignee: false,
  isAddingResponsible: false,
  isAddingLabel: false,
  isAddingDueDate: false,
  isAddingDesc: false,
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case GET_ALL_COMMENTS_IN_CARD:
      return {
        ...state,
        isFetchingComments: true,
      }
    case `${GET_ALL_COMMENTS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        comments: action.payload.data,
        isFetchingComments: false,
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
    default:
      return state
  }
}