import { CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, SAVE_CARD_POS, SAVE_CARD_TITLE } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllCardsInList = listId => (dispatch) => {
  dispatch({
    type: GET_ALL_CARDS_IN_LIST,
    listId,
    payload: {
      request: {
        method: 'GET',
        url: `/api/lists/${listId}/cards`,
      },
    },
  })
}

export const addCard = (listId, lastCardPos) => (dispatch) => {
  dispatch({
    type: ADD_CARD,
    listId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/lists/${listId}/cards`,
        data: {
          title: 'New card',
          pos: (lastCardPos || 0) + 1,
        },
      },
    },
  })
}

export const deleteCard = (listId, cardId) => (dispatch) => {
  dispatch({
    type: DELETE_CARD,
    cardId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}`,
      },
    },
  })
}

export const saveCardPos = card => (dispatch) => {
  dispatch({
    type: SAVE_CARD_POS,
    cardId: card.id,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/cards/${card.id}`,
        data: {
          listId: card.listId,
          pos: card.pos,
        },
      },
    },
  })
}

export const saveCardTitle = (cardId, cardTitle) => (dispatch) => {
  dispatch({
    type: SAVE_CARD_TITLE,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/cards/${cardId}`,
        data: {
          title: cardTitle,
        },
      },
    },
  })
}
