import { GET_ALL_BOARDS } from './constants'

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
