import { CLEAN_STATE,
  GET_ALL_COMMENTS_IN_CARD, GET_ALL_LABELS_IN_CARD, GET_ALL_ASSIGNEES_IN_CARD, GET_RESPONSIBLE_FOR_CARD, GET_ONE_CARD,
  ADD_COMMENT, ADD_LABEL, ADD_MEMBER, ADD_RESPONSIBLE,
  UPDATE_DUE_DATE, UPDATE_DESC } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllCommentsInBoard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_COMMENTS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/comments`,
      },
    },
  })
}

export const getAllAssigneesInBoard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_ASSIGNEES_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/members`,
      },
    },
  })
}

export const getAllLabelsInBoard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LABELS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/labels`,
      },
    },
  })
}

export const getResponsibleForBoard = cardId => (dispatch) => {
  dispatch({
    type: GET_RESPONSIBLE_FOR_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/responsible`,
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
        url: `/api/cards/${cardId}/comments`,
        data: {
          content,
          userId,
        },
      },
    },
  })
}

export const addLabel = (cardId, labelId) => (dispatch) => {
  dispatch({
    type: ADD_LABEL,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/labels`,
        data: {
          labelId,
        },
      },
    },
  })
}

export const addMember = (cardId, userId) => (dispatch) => {
  dispatch({
    type: ADD_MEMBER,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/members`,
        data: {
          memberId: userId,
        },
      },
    },
  })
}

export const addResponsible = (cardId, userId) => (dispatch) => {
  dispatch({
    type: ADD_RESPONSIBLE,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/responsible`,
        data: {
          responsibleId: userId,
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

