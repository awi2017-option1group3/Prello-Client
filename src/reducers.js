import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import usersReducer from './containers/users/reducer'
import userReducer from './containers/user/reducer'
import loginReducer from './containers/login/reducer'
import registerReducer from './containers/register/reducer'
import notificationsReducer from './containers/notifications/reducer'
import boardsReducer from './containers/boards/reducer'
import boardReducer from './containers/board/reducer'
import boardMembersReducer from './containers/boardMembers/reducer'
import boardLabelsReducer from './containers/boardLabels/reducer'
import listsReducer from './containers/lists/reducer'
import cardsReducer from './containers/cards/reducer'
import cardReducer from './containers/card/reducer'
import assigneesReducer from './containers/assignees/reducer'
import labelsReducer from './containers/labels/reducer'
import tasksReducer from './containers/taskLists/reducer'
import cardAttachmentsReducer from './containers/attachments/reducer'
import cardCommentsReducer from './containers/comments/reducer'
import forgotPasswordReducer from './containers/forgotPassword/reducer'
import checkRegistrationReducer from './containers/checkRegistration/reducer'

export default combineReducers({
  router: routerReducer,

  users: usersReducer,
  user: userReducer,
  login: loginReducer,
  register: registerReducer,
  checkRegistration: checkRegistrationReducer,
  forgotPassword: forgotPasswordReducer,
  notifications: notificationsReducer,

  boards: boardsReducer,
  currentBoard: boardReducer,
  boardMembers: boardMembersReducer,
  boardLabels: boardLabelsReducer,

  lists: listsReducer,

  cards: cardsReducer,
  currentCard: cardReducer,
  currentCardLabels: labelsReducer,
  cardAssignees: assigneesReducer,
  cardTasks: tasksReducer,
  cardAttachments: cardAttachmentsReducer,
  cardComments: cardCommentsReducer,

  labels: labelsReducer,
})
