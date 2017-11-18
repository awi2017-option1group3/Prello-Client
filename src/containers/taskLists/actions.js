import { GET_ALL_TASKLISTS_IN_CARD, ADD_TASKLIST_IN_CARD, REMOVE_TASKLIST_IN_CARD,
  ADD_TASK_IN_TASKLIST, REMOVE_TASK_IN_TASKLIST,
  UPDATE_TASK_DONE, UPDATE_TASK_TITLE, UPDATE_TASKLIST_TITLE } from './constants'

export const getAllTasksListsInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_TASKLISTS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/tasklists`,
      },
    },
  })
}

/*
export const getAllTasksInTasksList = taskListId => (dispatch) => {
  dispatch({
    type: GET_ALL_TASKS_IN_TASKLISTS,
    payload: {
      request: {
        method: 'GET',
        url: `/api/tasklists/${taskListId}`,
      },
    },
  })
}
*/

export const addTaskListInCard = (cardId, taskListId) => (dispatch) => {
  dispatch({
    type: ADD_TASKLIST_IN_CARD,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/tasklists/`,
        data: {
          taskListId,
        },
      },
    },
  })
}

export const addTaskInTaskList = (taskListId, title) => (dispatch) => {
  dispatch({
    type: ADD_TASK_IN_TASKLIST,
    taskListId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/tasklists/${taskListId}/tasks/`,
        data: {
          taskListId,
          title,
        },
      },
    },
  })
}

export const removeTaskListInCard = (cardId, taskListId) => (dispatch) => {
  dispatch({
    type: REMOVE_TASKLIST_IN_CARD,
    taskListId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/tasklists/${taskListId}`,
      },
    },
  })
}

export const removeTaskInTaskList = (taskId, taskListId) => (dispatch) => {
  dispatch({
    type: REMOVE_TASK_IN_TASKLIST,
    taskId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/tasklists/${taskListId}/tasks/${taskId}`,
      },
    },
  })
}

export const updateTaskListTitle = (taskListId, title) => (dispatch) => {
  dispatch({
    type: UPDATE_TASKLIST_TITLE,
    taskListId,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/tasklists/${taskListId}`,
        data: {
          title,
        },
      },
    },
  })
}

export const updateTaskDone = (taskId, done) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK_DONE,
    taskId,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/tasks/${taskId}`,
        data: {
          done,
        },
      },
    },
  })
}

export const updateTaskTitle = (taskId, title) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK_TITLE,
    taskId,
    payload: {
      request: {
        method: 'PUT',
        url: `/api/tasks/${taskId}`,
        data: {
          title,
        },
      },
    },
  })
}
