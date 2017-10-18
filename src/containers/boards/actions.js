import { SAVE_LIST_RANK, GET_ALL_LISTS_IN_BOARD, GET_ALL_CARDS_IN_LIST, SAVE_CARD_RANK } from './constants'

export const getAllListsInBoard = boardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LISTS_IN_BOARD,
    payload: {
      request: {
        method: 'GET',
        url: '/lists',
      },
    },
  })
}

export const saveListRank = list => (dispatch) => {
  dispatch({
    type: SAVE_LIST_RANK,
    payload: {
      request: {
        method: 'PATCH',
        url: `/lists/${list.id}`,
        data: {
          rank: list.rank,
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
