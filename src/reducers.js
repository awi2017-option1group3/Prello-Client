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
import listsReducer from './containers/lists/reducer'
import cardsReducer from './containers/cards/reducer'
import cardReducer from './containers/card/reducer'
import assigneesReducer from './containers/assignees/reducer'
import labelsReducer from './containers/labels/reducer'
import cardAttachmentsReducer from './containers/attachments/reducer'
import forgotPasswordReducer from './containers/forgotPassword/reducer'

export default combineReducers({
  router: routerReducer,

  users: usersReducer,
  user: userReducer,
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  notifications: notificationsReducer,

  boards: boardsReducer,
  currentBoard: boardReducer,
  boardMembers: boardMembersReducer,

  lists: listsReducer,

  cards: cardsReducer,
  currentCard: cardReducer,
  currentCardLabels: labelsReducer,
  cardAssignees: assigneesReducer,
  cardAttachments: cardAttachmentsReducer,

  labels: labelsReducer,
})
