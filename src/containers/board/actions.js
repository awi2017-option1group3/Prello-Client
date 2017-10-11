import { ADD_LIST, GET_ALL_LISTS, DELETE_LIST } from './constants'

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

export const deleteList = id => (dispatch) => {
  dispatch({
    type: DELETE_LIST,
    listId: id,
    payload: {
      request: {
        method: 'DELETE',
        url: `/lists/${id}`,
      },
    },
  })
}
