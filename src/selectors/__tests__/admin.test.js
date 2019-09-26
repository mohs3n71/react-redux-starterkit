import {fromJS} from 'immutable'

import {
  initAuthState
} from '../../reducers/admin'
import {
  authSelector,
  authDataSelector,
  authLoadingSelector,
  authErrorSelector,
  authServerSelector
} from '../admin'

import {
  successMock,
  errorMocks,
  server
} from '../../sagas/__mocks__/login.mock'

import {getRandomErrorMock} from '../../sagas/__tests__/index.test'

describe('Admin selectors', () => {
  it('should select `auth`', () => {
    const state = fromJS({
      admin: {
        auth: initAuthState
      }
    })

    expect(authSelector(state)).toEqual(initAuthState)
  })

  it('should select `data` from `auth`', () => {
    const selector = authDataSelector()
    const state = fromJS({
      admin: {
        auth: initAuthState.merge({
          data: successMock
        })
      }
    })

    expect(selector(state)).toEqual(fromJS(successMock))
  })

  it('should select `server` from `auth`', () => {
    const selector = authServerSelector()
    const state = fromJS({
      admin: {
        auth: initAuthState.merge({
          server: server
        })
      }
    })

    expect(selector(state)).toEqual(server)
  })

  it('should select `error` from `auth`', () => {
    const selector = authErrorSelector()
    const {response} = getRandomErrorMock(errorMocks)
    const state = fromJS({
      admin: {
        auth: initAuthState.merge({
          error: response
        })
      }
    })

    expect(selector(state)).toEqual(fromJS(response))
  })

  it('should select `loading` from `addForm`', () => {
    const selector = authLoadingSelector()
    const state = fromJS({
      admin: {
        auth: initAuthState.merge({
          loading: true
        })
      }
    })

    expect(selector(state)).toBeTruthy()
  })
})
