import {takeLatest, call, put, select} from 'redux-saga/effects'

import {authDataSelector, authServerSelector} from '../selectors/admin'
import {
  LOGIN, loginSuccess, loginError,
  LOGOUT, logoutSuccess, logoutError
} from '../actions/admin'
import {makeRequest} from '../utils/requests'

export function * login ({payload}) {
  const {username, password, server} = payload
  const url = `${server}/admin/login.json`
  const data = {
    username,
    password
  }
  try {
    const response = yield call(makeRequest, 'POST', undefined, url, data)
    yield put(loginSuccess(response.data, server))
  } catch (error) {
    const status = error.response ? error.response.status : 500
    yield put(loginError({status}))
  }
}

export function * loginSaga () {
  yield takeLatest(LOGIN, login)
}

export function * logout () {
  const server = yield select(authServerSelector())
  const {authToken} = yield select(authDataSelector())
  const url = `${server}/admin/logout.json`

  try {
    yield call(makeRequest, 'DELETE', authToken, url)
    yield put(logoutSuccess())
  } catch (error) {
    const status = error.response ? error.response.status : 500
    yield put(logoutError({status}))
  }
}

export function * logoutSaga () {
  yield takeLatest(LOGOUT, logout)
}

export default [
  loginSaga,
  logoutSaga
]
