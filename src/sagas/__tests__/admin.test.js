import {takeLatest, put} from 'redux-saga/effects'
import Faker from 'faker'

import isArray from 'lodash/isArray'

import {
  LOGIN, loginSuccess, loginError,
  LOGOUT, logoutSuccess, logoutError
} from '../../actions/admin'
import {
  default as sagas,
  loginSaga, login,
  logoutSaga, logout
} from '../admin'

import {
  successMock as loginSuccessMock,
  server
} from '../../sagas/__mocks__/login.mock'

describe('Request saga for logging in', () => {
  const saga = loginSaga()

  it('should watch `LOGIN` action', () => {
    const descriptor = saga.next().value
    expect(descriptor).toEqual(takeLatest(LOGIN, login))
  })
})

describe('Generator `login`', () => {
  let generator

  const username = Faker.internet.userName()
  const password = Faker.internet.password()

  const action = {
    type: LOGIN,
    payload: {
      username,
      password,
      server
    }
  }

  beforeEach(() => {
    generator = login(action)
    generator.next()
  })

  it('should handle success', () => {
    const response = {
      data: loginSuccessMock
    }

    const descriptor = generator.next(response).value
    const result = put(loginSuccess(response.data, server))

    expect(descriptor).toEqual(result)
  })

  it('should handle error with response', () => {
    const error = new Error()
    error.response = {
      status: 400
    }

    const descriptor = generator.throw(error).value
    const result = put(loginError(error.response))

    expect(descriptor).toEqual(result)
  })

  it('should handle error without response', () => {
    const error = new Error()
    error.response = undefined

    const descriptor = generator.throw(error).value
    const result = put(loginError({status: 500}))

    expect(descriptor).toEqual(result)
  })
})

describe('Request saga for logging out user', () => {
  const saga = logoutSaga()

  it('should watch `LOGOUT` action', () => {
    const descriptor = saga.next().value
    expect(descriptor).toEqual(takeLatest(LOGOUT, logout))
  })
})

describe('Generator `logout`', () => {
  let generator

  const action = {
    type: LOGOUT
  }

  beforeEach(() => {
    generator = logout(action)
    generator.next()
    generator.next(server)
    generator.next({loginSuccessMock})
  })

  it('should handle success', () => {
    const descriptor = generator.next().value
    const result = put(logoutSuccess())

    expect(descriptor).toEqual(result)
  })

  it('should handle error with response', () => {
    const error = new Error()
    error.response = {
      status: 400
    }

    const descriptor = generator.throw(error).value
    const result = put(logoutError(error.response))

    expect(descriptor).toEqual(result)
  })

  it('should handle error without response', () => {
    const error = new Error()
    error.response = undefined

    const descriptor = generator.throw(error).value
    const result = put(logoutError({status: 500}))

    expect(descriptor).toEqual(result)
  })
})

describe('Container of admin sagas', () => {
  it('should be an array', () => {
    expect(isArray(sagas)).toBeTruthy()
  })

  it('should consist of all sagas', () => {
    const expectedSagas = [
      loginSaga,
      logoutSaga
    ]
    expect(expectedSagas).toEqual(sagas)
  })
})
