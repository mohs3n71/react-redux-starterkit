import moment from 'moment'

export const timestampFormat = 'YYYY-MM-DDTHH:mm:ss'

export function getTimestamp (date) {
  return moment.utc(date).format(timestampFormat)
}

export function getUnix () {
  return moment().unix()
}

export function setLocale (locale) {
  return moment.locale(locale)
}
