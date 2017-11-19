import { GET_ALL_TASKLISTS_IN_CARD, ADD_TASKLIST_IN_CARD, REMOVE_TASKLIST_IN_CARD,
  ADD_TASK_IN_TASKLIST, REMOVE_TASK_IN_TASKLIST,
  UPDATE_TASK_DONE, UPDATE_TASK_TITLE, UPDATE_TASKLIST_TITLE } from './constants'

const initialState = {
  data: [],
  isAdding: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_TASKLISTS_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${ADD_TASKLIST_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${REMOVE_TASKLIST_IN_CARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(tasklist => tasklist.id !== action.meta.previousAction.taskListId),
      }
    case `${ADD_TASK_IN_TASKLIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.map((tasklist) => {
          if (tasklist.id === action.meta.previousAction.taskListId) {
            tasklist.tasks = action.payload.data
            return tasklist
          }
          return tasklist
        }),
      }
    case `${REMOVE_TASK_IN_TASKLIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.map((tasklist) => {
          if (tasklist.id === action.meta.previousAction.taskListId) {
            tasklist.tasks = tasklist.tasks.filter(task => task.id !== action.meta.previousAction.taskId)
            return tasklist
          } 
          return tasklist
        }),
      }
    case `${UPDATE_TASKLIST_TITLE}_SUCCESS`:
      return {
        ...state,
        data: state.data.map(tasklist =>
          ((tasklist.id === action.meta.previousAction.tasklistId) ?
            action.payload.data : tasklist)),
      }
    case `${UPDATE_TASK_DONE}_SUCCESS`:
      return {
        ...state,
        data: state.data.map((tasklist) => {
          tasklist.tasks = tasklist.tasks.map(task =>
            (task.id === action.meta.previousAction.taskId ?
              action.payload.data : task))
          return tasklist
        }),
      }
    case `${UPDATE_TASK_TITLE}_SUCCESS`:
      return {
        ...state,
        data: state.data.map((tasklist) => {
          tasklist.tasks = tasklist.tasks.map(task =>
            (task.id === action.meta.previousAction.taskId ?
              action.payload.data : task))
          return tasklist
        }),
      }
    default:
      return state
  }
}
