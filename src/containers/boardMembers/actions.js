import { GET_BOARD_OWNER, GET_BOARD_CONTRIBUTORS, ADD_CONTRIBUTOR_TO_BOARD, REMOVE_CONTRIBUTOR_FROM_BOARD } from './constants'

export const getBoardOwner = boardId => (dispatch) => {
  dispatch({
    type: GET_BOARD_OWNER,
    payload: {
      request: {
        method: 'GET',
        url: `/api/boards/${boardId}/owner`,
      },
    },
  })
}

export const getBoardContributors = boardId => (dispatch) => {
  dispatch({
    type: GET_BOARD_CONTRIBUTORS,
    payload: {
      request: {
        method: 'GET',
        url: `/api/boards/${boardId}/contributors`,
      },
    },
  })
}

export const addContributorToBoard = (userId, boardId) => (dispatch) => {
  dispatch({
    type: ADD_CONTRIBUTOR_TO_BOARD,
    payload: {
      request: {
        method: 'POST',
        url: `/api/boards/${boardId}/contributors`,
        data: {
          userId,
        },
      },
    },
  })
}

export const removeContributorFromBoard = (userId, boardId) => (dispatch) => {
  dispatch({
    type: REMOVE_CONTRIBUTOR_FROM_BOARD,
    userId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/boards/${boardId}/contributors/${userId}`,
      },
    },
  })
}