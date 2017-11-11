import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import loginReducer from './containers/login/reducer'
import userReducer from './containers/user/reducer'
import boardsReducer from './containers/boards/reducer'
import boardReducer from './containers/board/reducer'
import listsReducer from './containers/lists/reducer'
import labelsReducer from './containers/labels/reducer'
import usersReducer from './containers/users/reducer'
import cardsReducer from './containers/cards/reducer'
import cardReducer from './containers/card/reducer'
import assigneesReducer from './containers/assignees/reducer'
import registerReducer from './containers/register/reducer'

export default combineReducers({
  router: routerReducer,
  login: loginReducer,
  user: userReducer,
  boards: boardsReducer,
  currentBoard: boardReducer,
  lists: listsReducer,
  cards: cardsReducer,
  labels: labelsReducer,
  users: usersReducer,
  currentCard: cardReducer,
  cardAssignees: assigneesReducer,
  currentCardLabels: labelsReducer,
  register: registerReducer,
})