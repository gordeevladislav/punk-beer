import { combineReducers } from 'redux'
import beerReducer from './beer'
import authReducer from './auth'
import favouriteReducer from './favourite'

export default combineReducers({
  beer: beerReducer,
  auth: authReducer,
  favourite: favouriteReducer
})