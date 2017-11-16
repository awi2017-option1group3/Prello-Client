import {
  CLEAN_STATE,
  GET_ALL_COMMENTS_IN_CARD, GET_ONE_CARD,
  ADD_COMMENT,
  UPDATE_DUE_DATE, UPDATE_DESC } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllCommentsInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_COMMENTS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/comments/`,
      },
    },
  })
}

export const getOneCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ONE_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}`,
      },
    },
  })
}

export const addComment = (cardId, content, userId) => (dispatch) => {
  dispatch({
    type: ADD_COMMENT,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/comments/`,
        data: {
          content,
          userId,
        },
      },
    },
  })
}

export const updateDueDate = (cardId, dueDate) => (dispatch) => {
  dispatch({
    type: UPDATE_DUE_DATE,
    cardId,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/cards/${cardId}/`,
        data: {
          dueComplete: dueDate,
        },
      },
    },
  })
}

export const updateDesc = (cardId, desc) => (dispatch) => {
  dispatch({
    type: UPDATE_DESC,
    cardId,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/cards/${cardId}/`,
        data: {
          desc,
        },
      },
    },
  })
}

export const removeAssigneeInCard = (cardId, memberId) => (dispatch) => {
  dispatch({
    type: REMOVE_ASSIGNEE,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/assignees/${memberId}`,
      },
    },
  })
}

export const removeLabelInCard = (cardId, labelId) => (dispatch) => {
  dispatch({
    type: REMOVE_LABEL,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/labels/${labelId}`,
      },
    },
  })
}

