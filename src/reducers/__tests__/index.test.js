import isFunction from 'lodash/isFunction'

import reducers from '../'

import {
  initAuthState
} from '../admin'
import {
  initHospitalsState
} from '../dashboard'

describe('Combined immutable reducers', () => {
  it('should be executable', () => {
    expect(isFunction(reducers)).toBeTruthy()
    expect(() => reducers(undefined, {})).not.toThrow()
  })

  it('should consist of all reducers', () => {
    const expectedCombinedReducers = {
      admin: {
        auth: initAuthState.toJS()
      },
      dashboard: {
        hospitals: initHospitalsState.toJS()
      }
    }
    const currentCombinedReducers = reducers(undefined, {}).toJS()

    expect(currentCombinedReducers).toEqual(expectedCombinedReducers)
  })
})
