import Faker from 'faker'
import {
  ALTER_USER, alterUser,
  ALTER_USER_SUCCESS, alterUserSuccess,
} from '../dashboard'

describe('Action: alterUser', () => {
  it(`should create action 'ALTER_USER'`, () => {
    const rand = Faker.random.number({
      min: 0,
      max: 2
    })
    const userStates = ['ACTIVE', 'DEREGISTERED', 'SUSPENDED']
    const state = userStates[rand]

    const userId = (Math.random() * 1e32).toString(36)
    const expectedAction = {
      type: ALTER_USER,
      payload: {
        userId,
        state
      }
    }

    const currentAction = alterUser(userId, state)

    expect(currentAction).toEqual(expectedAction)
  })

  it('should create action `ALTER_USER_SUCCESS`', () => {
    const data = null

    const expectedAction = {
      type: ALTER_USER_SUCCESS,
      payload: {
        data
      }
    }
    const currentAction = alterUserSuccess(data)

    expect(currentAction).toEqual(expectedAction)
  })
})
