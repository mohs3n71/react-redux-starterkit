import {combineReducers} from 'redux-immutable'

import admin from './admin'
//import dashboard from './dashboard'

import {LOGOUT_SUCCESS, LOGOUT_ERROR} from '../actions/admin'

const appReducer = combineReducers({
  admin: combineReducers(admin),
  //dashboard: combineReducers(dashboard),
})

export default (state, action) => {
  if (action.type === LOGOUT_SUCCESS || action.type === LOGOUT_ERROR) {
    state = undefined
  }
  return appReducer(state, action)
}
