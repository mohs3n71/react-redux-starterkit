import Faker from 'faker'
import moment from 'moment'

import isInteger from 'lodash/isInteger'

import {
  setLocale,
  timestampFormat,
  getTimestamp,
  getUnix
} from '../moments'

describe('Function `setLocale`', () => {
  it('should set locale', () => {
    const allLocales = ['en-gb']

    allLocales.forEach((locale) => {
      const currentLocale = setLocale(locale)

      expect(currentLocale).toEqual(locale)
      expect(moment.locale()).toEqual(locale)
    })
  })
})

describe('Function `getTimestamp`', () => {
  const randomYear = Faker.random.number({min: 1900, max: 2000})

  it('should make timestamp in custom UTC format', () => {
    const timestamp = getTimestamp()
    expect(moment.utc(timestamp, timestampFormat).isValid()).toBeTruthy()
  })

  it('should allow to set custom date', () => {
    const date = moment().year(randomYear)

    const timestamp = getTimestamp(date)

    expect(moment.utc(timestamp, timestampFormat).year()).toEqual(randomYear)
  })

  it('should allow to use regular JavaScript date', () => {
    const date = new Date().setFullYear(randomYear)

    const timestamp = getTimestamp(date)

    expect(moment.utc(timestamp, timestampFormat).year()).toEqual(randomYear)
  })
})

describe('Function `getUnix`', () => {
  it('should be an integer', () => {
    expect(isInteger(getUnix())).toBeTruthy()
  })
})
