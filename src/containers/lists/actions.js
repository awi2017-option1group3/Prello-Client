import { CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD, SAVE_LIST_POS, RENAME_LIST } from './constants'

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
        url: `/api/boards/${boardId}/lists`,
      },
    },
  })
}

export const addList = (boardId, lastPos) => (dispatch) => {
  dispatch({
    type: ADD_LIST,
    payload: {
      request: {
        method: 'POST',
        url: `/api/boards/${boardId}/lists`,
        data: {
          title: 'New list',
          pos: (lastPos || 0) + 1,
        },
      },
    },
  })
}

export const saveListPos = list => (dispatch) => {
  dispatch({
    type: SAVE_LIST_POS,
    listId: list.id,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/lists/${list.id}`,
        data: {
          pos: list.pos,
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
        url: `/api/lists/${listId}`,
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
        url: `/api/lists/${listId}`,
      },
    },
  })
}
