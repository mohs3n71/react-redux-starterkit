export const LOGIN = 'pmac/LOGIN'
export const LOGIN_SUCCESS = 'pmac/LOGIN_SUCCESS'
export const LOGIN_ERROR = 'pmac/LOGIN_ERROR'

export function login (username, password, server) {
  return {
    type: LOGIN,
    payload: {
      username,
      password,
      server
    }
  }
}

export function loginSuccess (data, server) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      data,
      server
    }
  }
}

export function loginError (error) {
  return {
    type: LOGIN_ERROR,
    payload: {
      error
    }
  }
}

export const LOGOUT = 'pmac/LOGOUT'
export const LOGOUT_SUCCESS = 'pmac/LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'pmac/LOGOUT_ERROR'

export function logout () {
  return {
    type: LOGOUT
  }
}

export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logoutError (error) {
  return {
    type: LOGOUT_ERROR,
    payload: {
      error
    }
  }
}
