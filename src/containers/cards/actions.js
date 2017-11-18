import {
  CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, REFRESH_CARD, SAVE_CARD_POS, SAVE_CARD_TITLE,
  SAVE_CARD_DESC,
  PUSH_NEW_CARD, PUSH_NEW_CARD_NAME, PUSH_NEW_CARD_POSITION, PUSH_DELETE_CARD, PUSH_REFRESH_CARD,
} from './constants'

// Synchronous actions

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

// Synchronous actions for realtime

export const pushNewCard = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_NEW_CARD,
    card: wrapper.object,
  })
}

export const pushNewCardName = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_NEW_CARD_NAME,
    card: wrapper.object,
  })
}

export const pushNewCardPosition = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_NEW_CARD_POSITION,
    card: wrapper.object,
  })
}

export const pushDeleteCard = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_DELETE_CARD,
    cardId: wrapper.object.cardId,
  })
}

export const pushRefreshCard = wrapper => (dispatch) => {
  dispatch({
    type: PUSH_REFRESH_CARD,
    card: wrapper.object,
  })
}

// Asynchronous actions hitting the API

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

export const refreshCard = (boardId, cardId) => (dispatch) => {
  dispatch({
    type: REFRESH_CARD,
    boardId,
    cardId,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/populated/`,
      },
    },
  })
}

export const addCard = (boardId, listId, lastCardPos, title) => (dispatch) => {
  dispatch({
    type: ADD_CARD,
    boardId,
    listId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/lists/${listId}/cards`,
        data: {
          title,
          pos: (lastCardPos || 0) + 1,
        },
      },
    },
  })
}

export const deleteCard = (boardId, listId, cardId) => (dispatch) => {
  dispatch({
    type: DELETE_CARD,
    boardId,
    cardId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}`,
      },
    },
  })
}

export const saveCardPos = (boardId, card) => (dispatch) => {
  dispatch({
    type: SAVE_CARD_POS,
    boardId,
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

export const saveCardTitle = (boardId, cardId, cardTitle) => (dispatch) => {
  dispatch({
    type: SAVE_CARD_TITLE,
    boardId,
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
