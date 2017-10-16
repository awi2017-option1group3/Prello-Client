import { ADD_CARD, GET_ALL_CARDS_IN_LIST } from './constants'

export const addCard = listId => (dispatch) => {
  console.log(`List ID : ${listId}`)
  dispatch({
    type: ADD_CARD,
    payload: {
      request: {
        method: 'POST',
        url: `/lists/${listId}/cards`,
        data: {
          title: 'New card',
          listId: listId,
        },
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
