import { GET_ALL_ASSIGNEES_IN_CARD, GET_RESPONSIBLE_FOR_CARD, ADD_ASSIGNEE_TO_CARD, ADD_RESPONSIBLE_TO_CARD, REMOVE_ASSIGNEE_FROM_CARD, REMOVE_RESPONSIBLE_FROM_CARD } from './constants'

export const getAllAssigneesInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_ASSIGNEES_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/assignees/`,
      },
    },
  })
}

export const getResponsibleForCard = cardId => (dispatch) => {
  dispatch({
    type: GET_RESPONSIBLE_FOR_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/responsible/`,
      },
    },
  })
}

export const addAssigneeToCard = (cardId, userId) => (dispatch) => {
  dispatch({
    type: ADD_ASSIGNEE_TO_CARD,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/assignees/`,
        data: {
          memberId: userId,
        },
      },
    },
  })
}

export const addResponsibleToCard = (cardId, userId) => (dispatch) => {
  dispatch({
    type: ADD_RESPONSIBLE_TO_CARD,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/responsible/`,
        data: {
          responsibleId: userId,
        },
      },
    },
  })
}

export const removeAssigneeFromCard = (cardId, memberId) => (dispatch) => {
  dispatch({
    type: REMOVE_ASSIGNEE_FROM_CARD,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/assignees/${memberId}`,
      },
    },
  })
}

export const removeResponsibleFromCard = (cardId) => (dispatch) => {
  dispatch({
    type: REMOVE_RESPONSIBLE_FROM_CARD,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/responsible/`,
      },
    },
  })
}
