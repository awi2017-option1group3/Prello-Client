import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import boardReducer from './containers/board/reducer'

export default combineReducers({
  router: routerReducer,
  board: boardReducer,
})
