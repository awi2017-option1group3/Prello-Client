import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import listsReducer from './containers/lists/reducer'

export default combineReducers({
  router: routerReducer,
  lists: listsReducer,
})
