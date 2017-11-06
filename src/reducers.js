import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import loginReducer from './containers/login/reducer'
import boardsReducer from './containers/boards/reducer'
import boardReducer from './containers/board/reducer'
import listsReducer from './containers/lists/reducer'
import usersReducer from './containers/users/reducer'
import cardsReducer from './containers/cards/reducer'
import cardReducer from './containers/card/reducer'
import registerReducer from './containers/register/reducer'

export default combineReducers({
  router: routerReducer,
  login: loginReducer,
  boards: boardsReducer,
  currentBoard: boardReducer,
  lists: listsReducer,
  cards: cardsReducer,
  users: usersReducer,
  currentCard: cardReducer,
  register: registerReducer,
})
