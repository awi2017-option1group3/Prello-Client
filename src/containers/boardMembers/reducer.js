import { GET_BOARD_OWNER, GET_BOARD_CONTRIBUTORS, ADD_CONTRIBUTOR_TO_BOARD, REMOVE_CONTRIBUTOR_FROM_BOARD } from './constants'

const initialState = {
  owner: {
    id: '',
    email: '',
    fullName: '',
    initials: '',
    username: '',
  },
  contributors: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_BOARD_OWNER}_SUCCESS`:
      return {
        ...state,
        owner: action.payload.data,
      }
    case `${GET_BOARD_CONTRIBUTORS}_SUCCESS`:
      return {
        ...state,
        contributors: action.payload.data,
      }
    case `${ADD_CONTRIBUTOR_TO_BOARD}_SUCCESS`:
      return {
        ...state,
        contributors: action.payload.data ? state.contributors.concat(action.payload.data) : state.contributors,
      }
    case `${REMOVE_CONTRIBUTOR_FROM_BOARD}_SUCCESS`:
      return {
        ...state,
        contributors: state.contributors.filter(contributor => contributor.id !== action.meta.previousAction.userId),
      }
    default:
      return state
  }
}
