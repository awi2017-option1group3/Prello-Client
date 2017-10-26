import { GET_ALL_BOARDS, ADD_BOARD } from './constants'

export const getAllBoards = () => (dispatch) => {
  dispatch({
    type: GET_ALL_BOARDS,
    payload: {
      request: {
        method: 'GET',
        url: '/boards',
      },
    },
  })
}

export const addBoard = () => (dispatch) => {
  dispatch({
    type: ADD_BOARD,
    payload: {
      request: {
        method: 'POST',
        url: '/boards/',
        data: {
          title: 'New board',
        },
      },
    },
  })
}
