import {Map, fromJS} from 'immutable'
import {createStore, compose, applyMiddleware} from 'redux'
import {createTransform} from 'redux-persist'
import {persistStore, autoRehydrate} from 'redux-persist-immutable'
import sagaMiddlewareFactory from 'redux-saga'
import {routerMiddleware} from 'react-router-redux'

import reducers from './reducers'
import sagas from './sagas'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'

export function getCompose (bom, environment) {
  if (isObject(bom) && environment === 'development') {
    const extensionCompose = bom.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

    if (isFunction(extensionCompose)) {
      return extensionCompose
    }
  }

  return compose
}

export function purgeFetchingStateFilter (state) {
  state.forEach((value, key) => {
    if (Map.isMap(value)) {
      value = value.map((value, key) => {
        switch (key) {
          case 'success':
            return false
          case 'error':
            return null
          case 'loading':
            return false
          default:
            return value
        }
      })
    }

    state = state.set(key, value)
  })

  return state
}

export default function initiateStore (initialState = {}, history) {
  const sagaMiddleware = sagaMiddlewareFactory()

  const middleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history)
  )

  const store = createStore(
    reducers,
    fromJS(initialState),
    getCompose(window, process.env.NODE_ENV)(autoRehydrate(), middleware)
  )

  sagaMiddleware.run(sagas)

  persistStore(
    store,
    {
      transforms: [
        createTransform((state) => purgeFetchingStateFilter(state))
      ]
    }
  )

  return store
}
