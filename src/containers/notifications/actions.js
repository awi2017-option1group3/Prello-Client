import { GET_USER_NOTIFICATIONS, ADD_NOTIFICATION, MARK_NOTIFICATION_AS_READ } from './constants'

export const getUserNotifications = userId => (dispatch) => {
  dispatch({
    type: GET_USER_NOTIFICATIONS,
    payload: {
      request: {
        method: 'GET',
        url: `/api/users/${userId}/notifications`,
      },
    },
  })
}

export const addNotification = (targetUserId, sourceUserId, message, boardId) => (dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      request: {
        method: 'POST',
        url: `/api/users/${targetUserId}/notifications/`,
        data: {
          sourceUserId,
          boardId,
          message,
        },
      },
    },
  })
}

export const markNotificationAsRead = notificationId => (dispatch) => {
  dispatch({
    type: MARK_NOTIFICATION_AS_READ,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/notifications/${notificationId}`,
        data: {
          isRead: true,
        },
      },
    },
  })
}