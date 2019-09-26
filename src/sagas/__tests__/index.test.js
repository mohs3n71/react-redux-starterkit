import { all, fork } from 'redux-saga/effects'
import map from 'lodash/map'

import Faker from 'faker'

import keys from 'lodash/keys'

import sagas from '../'
import admin from '../admin'
import dashboard from '../dashboard'
export function getRandomErrorMock (errorMocks) {
  return errorMocks[Faker.random.arrayElement(keys(errorMocks))]
}

describe('Generator of all sagas', () => {
  const generator = sagas()

  it('should consist of forked sagas', () => {
    const expectedDescriptor = all(map([
      ...admin,
      ...dashboard
    ], (saga) => fork(saga)))
    const currentDescriptor = generator.next().value

    expect(currentDescriptor).toEqual(expectedDescriptor)
  })
})
