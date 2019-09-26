import values from 'lodash/values'

import Faker from 'faker'

import {
  LOGIN, login,
  LOGIN_SUCCESS, loginSuccess,
  LOGIN_ERROR, loginError,
  LOGOUT, logout,
  LOGOUT_SUCCESS, logoutSuccess,
  LOGOUT_ERROR, logoutError
} from '../admin'

import {
  server,
  successMock as loginSuccessMock,
  errorMocks as loginErrorMocks
} from '../../sagas/__mocks__/login.mock'
import {
  errorMocks as logoutErrorMocks
}
  from '../../sagas/__mocks__/logout.mock'
import {getRandomErrorMock} from '../../sagas/__tests__/index.test'

describe('Action: login', () => {
  it('should create action `LOGIN`', () => {
    const username = Faker.internet.userName()
    const password = Faker.internet.password()

    const expectedAction = {
      type: LOGIN,
      payload: {
        username,
        password,
        server
      }
    }
    const currentAction = login(...values(expectedAction.payload))

    expect(currentAction).toEqual(expectedAction)
  })

  it('should create action `LOGIN_SUCCESS`', () => {
    const data = loginSuccessMock

    const expectedAction = {
      type: LOGIN_SUCCESS,
      payload: {
        data,
        server
      }
    }
    const currentAction = loginSuccess(data, server)

    expect(currentAction).toEqual(expectedAction)
  })

  it('should create action `LOGIN_ERROR`', () => {
    const error = getRandomErrorMock(loginErrorMocks).response

    const expectedAction = {
      type: LOGIN_ERROR,
      payload: {
        error
      }
    }
    const currentAction = loginError(error)

    expect(currentAction).toEqual(expectedAction)
  })
})

describe('Action: logout', () => {
  it('should create action `LOGOUT', () => {
    const expectedAction = {
      type: LOGOUT
    }
    const currentAction = logout()

    expect(currentAction).toEqual(expectedAction)
  })

  it('should create action `LOGOUT_SUCCESS', () => {
    const expectedAction = {
      type: LOGOUT_SUCCESS
    }
    const currentAction = logoutSuccess()

    expect(currentAction).toEqual(expectedAction)
  })

  it('should create action `LOGOUT_ERROR', () => {
    const error = getRandomErrorMock(logoutErrorMocks).response
    const expectedAction = {
      type: LOGOUT_ERROR,
      payload: {
        error
      }
    }
    const currentAction = logoutError(error)

    expect(currentAction).toEqual(expectedAction)
  })
})
