import { CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD, SAVE_LIST_RANK, RENAME_LIST } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllListsInBoard = boardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LISTS_IN_BOARD,
    payload: {
      request: {
        method: 'GET',
        url: `/boards/${boardId}/lists`,
      },
    },
  })
}

export const addList = (boardId, lastRank) => (dispatch) => {
  dispatch({
    type: ADD_LIST,
    payload: {
      request: {
        method: 'POST',
        url: `/boards/${boardId}/lists`,
        data: {
          title: 'New list',
          rank: (lastRank || 0) + 1,
        },
      },
    },
  })
}

export const saveListRank = list => (dispatch) => {
  dispatch({
    type: SAVE_LIST_RANK,
    payload: {
      request: {
        method: 'PUT',
        url: `/lists/${list.id}`,
        data: {
          rank: list.rank,
        },
      },
    },
  })
}

export const saveTitleList = (listId, listTitle) => (dispatch) => {
  dispatch({
    type: RENAME_LIST,
    payload: {
      request: {
        method: 'PUT',
        url: `/lists/${listId}`,
        data: {
          title: listTitle,
        },
      },
    },
  })
}

export const deleteList = listId => (dispatch) => {
  dispatch({
    type: DELETE_LIST,
    listId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/lists/${listId}`,
      },
    },
  })
}
