import Faker from 'faker'

import {processData} from '../requests'

describe('Function `processData`', () => {
  it('should include fields from schema even if not set in data', () => {
    const firstName = Faker.name.firstName()
    const lastName = Faker.name.lastName()

    const schema = {
      firstName: null,
      lastName: null,
      gender: null,
      skills: []
    }
    const data = {
      firstName,
      lastName
    }

    const expectedResult = {
      firstName,
      lastName,
      gender: null,
      skills: []
    }

    expect(processData(data, schema)).toEqual(expectedResult)
  })

  it('should exclude fields if not specified in schema', () => {
    const schema = {
      apples: 0
    }
    const data = {
      apples: 0,
      bananas: 0
    }

    const expectedResult = {
      apples: 0
    }

    expect(processData(data, schema)).toEqual(expectedResult)
  })
})
