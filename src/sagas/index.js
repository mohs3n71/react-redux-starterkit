import {all, fork} from 'redux-saga/effects'
import map from 'lodash/map'

import admin from './admin'
import dashboard from './dashboard'

export default function * sagas () {
  yield all(map([
    ...admin,
    ...dashboard
  ], (saga) => fork(saga)))
}
