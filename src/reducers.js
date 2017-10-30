import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import loginReducer from './containers/login/reducer'
import boardsReducer from './containers/boards/reducer'
import boardReducer from './containers/board/reducer'
import listsReducer from './containers/lists/reducer'
import cardsReducer from './containers/cards/reducer'

export default combineReducers({
  router: routerReducer,
  login: loginReducer,
  boards: boardsReducer,
  currentBoard: boardReducer,
  lists: listsReducer,
  cards: cardsReducer,
})
