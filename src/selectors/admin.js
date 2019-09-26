import {createSelector} from 'reselect'

export const authSelector = (state) => {
  return state.get('admin').get('auth')
}

export const authServerSelector = () => createSelector(
  authSelector,
  (auth) => auth.get('server')
)

export const authDataSelector = () => createSelector(
  authSelector,
  (auth) => auth.get('data')
)

export const authErrorSelector = () => createSelector(
  authSelector,
  (auth) => auth.get('error')
)

export const authLoadingSelector = () => createSelector(
  authSelector,
  (auth) => auth.get('loading')
)
