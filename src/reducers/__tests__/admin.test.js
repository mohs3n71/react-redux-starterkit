import Faker from 'faker'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../../actions/admin'
import {
  initAuthState, authReducer
} from '../admin'

import {
  successMock as loginSuccessMock,
  errorMocks as loginErrorMock,
  server
} from '../../sagas/__mocks__/login.mock'

import {getRandomErrorMock} from '../../sagas/__tests__/index.test'

describe('`initAuthState` const', () => {
  it('should have expected structure', () => {
    const expectedInitState = {
      data: null,
      error: null,
      loading: false,
      server: null
    }
    const currentInitState = initAuthState.toJS()

    expect(currentInitState).toEqual(expectedInitState)
  })
})

describe('Auth reducer', () => {
  it('should set initial state', () => {
    const existingState = undefined
    const currentState = authReducer(existingState, {})

    expect(currentState).toEqual(initAuthState)
  })

  it('should set existing state', () => {
    const existingState = initAuthState.merge({
      data: loginSuccessMock
    })
    const currentState = authReducer(existingState, {})

    expect(currentState).toEqual(existingState)
  })

  it('should handle `LOGIN` action', () => {
    const action = {
      type: LOGIN,
      payload: {
        username: Faker.internet.userName(),
        password: Faker.internet.password(),
        server
      }
    }

    const expectedState = initAuthState.merge({
      loading: true
    }).toJS()
    const currentState = authReducer(undefined, action).toJS()

    expect(currentState).toEqual(expectedState)
  })

  it('should handle `LOGOUT` action', () => {
    const action = {
      type: LOGOUT
    }

    const expectedState = initAuthState.merge({
      loading: true
    }).toJS()
    const currentState = authReducer(undefined, action).toJS()

    expect(currentState).toEqual(expectedState)
  })

  it('should handle `LOGIN_SUCCESS` action', () => {
    const data = loginSuccessMock
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        data,
        server
      }
    }

    const expectedState = initAuthState.merge({
      data: action.payload.data,
      server: action.payload.server
    }).toJS()
    const currentState = authReducer(undefined, action).toJS()

    expect(currentState).toEqual(expectedState)
  })

  it('should handle `LOGOUT_SUCCESS` action', () => {
    const action = {
      type: LOGOUT_SUCCESS
    }

    const expectedState = initAuthState.merge({
    }).toJS()
    const currentState = authReducer(undefined, action).toJS()

    expect(currentState).toEqual(expectedState)
  })

  it('should handle `LOGIN_ERROR` action', () => {
    const error = getRandomErrorMock(loginErrorMock).response
    const action = {
      type: LOGIN_ERROR,
      payload: {
        error
      }
    }

    const expectedState = initAuthState.merge({
      error: action.payload.error
    }).toJS()
    const currentState = authReducer(undefined, action).toJS()

    expect(currentState).toEqual(expectedState)
  })

  it('should handle `LOGOUT_ERROR` action', () => {
    const error = getRandomErrorMock(loginErrorMock).response
    const action = {
      type: LOGOUT_ERROR,
      payload: {
        error
      }
    }

    const expectedState = initAuthState.merge({
      error: action.payload.error
    }).toJS()
    const currentState = authReducer(undefined, action).toJS()

    expect(currentState).toEqual(expectedState)
  })
})
