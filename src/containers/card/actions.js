import { CLEAN_STATE,
  GET_ALL_COMMENTS_IN_CARD, GET_ALL_LABELS_IN_CARD, GET_ALL_ASSIGNEES_IN_CARD, GET_RESPONSIBLE_FOR_CARD, GET_ONE_CARD,
  ADD_COMMENT, ADD_LABEL, ADD_ASSIGNEE, ADD_RESPONSIBLE, ADD_ATTACHMENT,
  UPDATE_DUE_DATE, UPDATE_DESC,
  REMOVE_ASSIGNEE, REMOVE_LABEL } from './constants'

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
        url: `/api/cards/${cardId}/comments`,
      },
    },
  })
}

export const getAllAssigneesInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_ASSIGNEES_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/assignees`,
      },
    },
  })
}

export const getAllLabelsInCard = cardId => (dispatch) => {
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

export const addLabel = (cardId, labelId) => (dispatch) => {
  dispatch({
    type: ADD_LABEL,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/labels/`,
        data: {
          labelId,
        },
      },
    },
  })
}

export const addAssignee = (cardId, userId) => (dispatch) => {
  dispatch({
    type: ADD_ASSIGNEE,
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

export const addResponsible = (cardId, userId) => (dispatch) => {
  dispatch({
    type: ADD_RESPONSIBLE,
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

export const addAttachment = (cardId, attachment) => (dispatch) => {
  dispatch({
    type: ADD_ATTACHMENT,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/attachments/`,
        data: {
          name: attachment.name,
          desc: attachment.description,
          attachmentId: attachment.id,
          attachmentUrl: attachment.url,
          attachmentIcon: attachment.embedUrl,
          lastEditedTime: attachment.lastEditedUtc,
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

