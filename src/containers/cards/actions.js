import { CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, UPDATE_ONE_CARD_POPULATED, SAVE_CARD_POS, SAVE_CARD_TITLE, SAVE_CARD_DESC } from './constants'

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

export const updateOneCardPopulated = cardId => (dispatch) => {
  dispatch({
    type: UPDATE_ONE_CARD_POPULATED,
    cardId,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/populated/`,
      },
    },
  })
}

export const addCard = (listId, lastCardPos, title) => (dispatch) => {
  dispatch({
    type: ADD_CARD,
    listId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/lists/${listId}/cards`,
        data: {
          title: title,
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

export const saveCardDesc = (cardId, cardDesc) => (dispatch) => {
  dispatch({
    type: SAVE_CARD_DESC,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/cards/${cardId}`,
        data: {
          desc: cardDesc,
        },
      },
    },
  })
}
