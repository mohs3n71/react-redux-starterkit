import axios from 'axios'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import keys from 'lodash/keys'
import mergeWith from 'lodash/mergeWith'
import omitBy from 'lodash/omitBy'

import {getTimestamp} from './moments'

export function makeRequest (method, authToken, url, data, params = undefined) {
  return axios({
    method,
    url,
    data,
    headers: {
      'AuthToken': authToken,
      'Timestamp': getTimestamp(),
      'Content-type': 'application/json'
    },
    params
  })
}

export function multipartRequest (authToken, url, config, logo,
  resource = undefined) {
  let formData = new FormData()
  if (isObject(config)) {
    let blob = new Blob([JSON.stringify(config)], {type: 'application/json'})
    formData.append('config', blob)
  }
  if (logo !== null) {
    formData.append('logo', logo)
  }
  if (resource !== null) {
    formData.append('resource', resource)
  }

  return axios.post(url, formData, {
    headers: {
      'AuthToken': authToken,
      'Timestamp': getTimestamp(),
      'Content-type': 'multipart/mixed'
    }
  })
}

export function noJson (authToken, url, state) {
  return axios.put(url, `"${state}"`, {
    headers: {
      'AuthToken': authToken,
      'Timestamp': getTimestamp(),
      'Content-type': 'application/json'
    }
  })
}

export function processData (data, schema) {
  const clonedData = cloneDeep(data)
  const clonedSchema = cloneDeep(schema)

  return omitBy(mergeWith(clonedSchema, clonedData, (schemaVal, dataVal) => {
    return !isUndefined(schemaVal) ? dataVal : null
  }), (value, key) => !keys(schema).includes(key) && isNull(value))
}
