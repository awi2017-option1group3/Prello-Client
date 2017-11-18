import {
  CLEAN_STATE,
  GET_ALL_COMMENTS_IN_CARD, GET_ONE_CARD,
  ADD_COMMENT, ADD_ATTACHMENT,
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

export const addAttachment = (cardId, element) => (dispatch) => {
  dispatch({
    type: ADD_ATTACHMENT,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/attachments/`,
        data: {
          name: element.name,
          desc: element.description,
          attachmentId: element.id,
          attachmentUrl: element.url,
          attachmentIcon: element.iconUrl,
          lastEditedTime: element.lastEditedUtc,
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
