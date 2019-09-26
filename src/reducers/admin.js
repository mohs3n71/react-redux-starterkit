import {fromJS} from 'immutable'

import {
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR
} from '../actions/admin'

export const initAuthState = fromJS({
  data: null,
  error: null,
  loading: false,
  server: null
})

export function authReducer (state = initAuthState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return state
        .set('error', null)
        .set('loading', true)
    case LOGIN_SUCCESS:
      return state
        .set('data', action.payload.data)
        .set('server', action.payload.server)
        .set('error', null)
        .set('loading', false)
    case LOGOUT_SUCCESS:
      return state
        .set('data', null)
        .set('error', null)
        .set('loading', false)
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return state
        .set('data', null)
        .set('error', action.payload.error)
        .set('loading', false)
    default:
      return state
  }
}

export default {
  auth: authReducer
}
