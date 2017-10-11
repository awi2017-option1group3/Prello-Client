import { ADD_LIST, GET_ALL_LISTS, SAVE_LIST_RANK } from './constants'

export const addList = lastRank => (dispatch) => {
  dispatch({
    type: ADD_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/lists',
        data: {
          title: 'New list',
          rank: (lastRank || 0) + 1,
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

export const saveListRank = list => (dispatch) => {
  dispatch({
    type: SAVE_LIST_RANK,
    payload: {
      request: {
        method: 'PATCH',
        url: `/lists/${list.id}`,
        data: {
          rank: list.rank,
        },
      },
    },
  })
}
