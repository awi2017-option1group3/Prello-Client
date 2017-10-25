import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import boardsReducer from './containers/boards/reducer'
import boardReducer from './containers/board/reducer'
import listsReducer from './containers/lists/reducer'
import cardsReducer from './containers/cards/reducer'
import registerReducer from './containers/register/reducer'

export default combineReducers({
  router: routerReducer,
  boards: boardsReducer,
  currentBoard: boardReducer,
  lists: listsReducer,
  cards: cardsReducer,
  register: registerReducer,
})
