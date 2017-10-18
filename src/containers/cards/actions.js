import { ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, SAVE_CARD_RANK } from './constants'


export const addCard = (listId, lastCardRank) => (dispatch) => {
  dispatch({
    type: ADD_CARD,
    payload: {
      request: {
        method: 'POST',
        url: `/lists/${listId}/cards`,
        data: {
          title: 'New card',
          listId: listId,
          rank: (lastCardRank || 0) + 1,
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
        url: `/lists/${listId}/cards/${cardId}`,
      },
    },
  })
}

export const getAllCardsInList = listId => (dispatch) => {
  dispatch({
    type: GET_ALL_CARDS_IN_LIST,
    payload: {
      request: {
        method: 'GET',
        url: `/lists/${listId}/cards`,
      },
    },
  })
}

export const saveCardRank = card => (dispatch) => {
  dispatch({
    type: SAVE_CARD_RANK,
    payload: {
      request: {
        method: 'PATCH',
        url: `/lists/${card.listId}/cards/${card.id}`,
        data: {
          listId: card.rank,
          rank: card.rank,
        },
      },
    },
  })
}
