import {
  CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD, SAVE_LIST_POS, RENAME_LIST,
  PUSH_NEW_LIST, PUSH_NEW_LIST_NAME, PUSH_NEW_LIST_POSITION, PUSH_DELETE_LIST,
} from './constants'

// Synchronous actions

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

// Synchronous actions for realtime

export const pushNewList = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_NEW_LIST,
    list: wrapper.object,
  })
}

export const pushNewListName = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_NEW_LIST_NAME,
    list: wrapper.object,
  })
}

export const pushNewListPosition = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_NEW_LIST_POSITION,
    list: wrapper.object,
  })
}

export const pushDeleteList = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_DELETE_LIST,
    listId: wrapper.object.listId,
  })
}

// Asynchronous actions hitting the API

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

export const addList = (boardId, lastPos, title) => (dispatch) => {
  dispatch({
    type: ADD_LIST,
    boardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/boards/${boardId}/lists`,
        data: {
          title,
          pos: (lastPos || 0) + 1,
        },
      },
    },
  })
}

export const saveListPos = (boardId, list) => (dispatch) => {
  dispatch({
    type: SAVE_LIST_POS,
    boardId,
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

export const saveTitleList = (boardId, listId, listTitle) => (dispatch) => {
  dispatch({
    type: RENAME_LIST,
    boardId,
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

export const deleteList = (boardId, listId) => (dispatch) => {
  dispatch({
    type: DELETE_LIST,
    boardId,
    listId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/lists/${listId}`,
      },
    },
  })
}
