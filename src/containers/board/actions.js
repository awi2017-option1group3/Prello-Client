import { ADD_LIST, GET_ALL_LISTS } from './constants'

export const addList = () => (dispatch) => {
  dispatch({
    type: ADD_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/lists',
        data: {
          title: 'New list',
        },
      },
    },
  })
}

export const getAllLists = () => (dispatch) => {
  dispatch({
    type: GET_ALL_LISTS,
    payload: {
      request: {
        method: 'GET',
        url: '/lists',
      },
    },
  })
}
