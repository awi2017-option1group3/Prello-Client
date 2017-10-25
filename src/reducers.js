import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import listsReducer from './containers/lists/reducer'
import cardsReducer from './containers/cards/reducer'
import registerReducer from './containers/register/reducer'

export default combineReducers({
  router: routerReducer,
  lists: listsReducer,
  cards: cardsReducer,
  register: registerReducer,
})
