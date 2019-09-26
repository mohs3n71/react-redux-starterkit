import React from 'react'
import {render} from 'react-dom'
import {Provider as StoreProvider} from 'react-redux'
import {Router, Switch, Route, Redirect} from 'react-router'
import {routerActions} from 'react-router-redux'
import {UserAuthWrapper} from 'redux-auth-wrapper'
import {createBrowserHistory} from 'history'
import {setLocale} from './utils/moments'

import {IntlProvider, addLocaleData} from 'react-intl'
import head from 'lodash/head'
import {LocaleProvider} from 'antd'
import enLocaleData from 'react-intl/locale-data/en'
import enUSLocaleProvider from 'antd/lib/locale-provider/en_US'
import enGBLocaleProvider from 'antd/lib/locale-provider/en_GB'

import {ThemeProvider} from 'styled-components'
import 'antd/dist/antd.less'

import toLower from 'lodash/toLower'

import initiateStore from './store'
import {
  Login,
  Dashboard
} from './routes'
import {Base} from './containers'

const history = createBrowserHistory()
const store = initiateStore(window.__INITIAL_STATE__, history)

let locale

switch (navigator.language) {
  case 'en-GB':
    locale = {
      code: navigator.language,
      localeData: enLocaleData,
      antd: enGBLocaleProvider
    }
    break
  default:
    locale = {
      code: 'en-US',
      localeData: enLocaleData,
      antd: enUSLocaleProvider
    }
}

setLocale(toLower(locale.code))
addLocaleData(locale.localeData)
head(document.getElementsByTagName('html')).setAttribute('lang', locale.code)

const PublicRoute = UserAuthWrapper({
  wrapperDisplayName: 'PublicRouteUserAuthWrapper',
  authSelector: (state) => state.get('admin').get('auth'),
  predicate: (auth) => !auth.get('data'),
  failureRedirectPath: (state, props) => {
    const {query = {}} = props.location
    return query.redirect || '/'
  },
  redirectAction: routerActions.replace,
  allowRedirectBack: false
})

const PrivateRoute = UserAuthWrapper({
  wrapperDisplayName: 'PrivateRouteUserAuthWrapper',
  authSelector: (state) => state.get('admin').get('auth'),
  predicate: (auth) => {
    auth = auth.get('data') || {}
    return auth.userId && auth.authToken
  },
  failureRedirectPath: '/login',
  redirectAction: routerActions.replace,
  allowRedirectBack: true
})

const publicRoutes = (
  <Route
    component={PublicRoute(() => (
      <Base showHeader={false} >
        <Switch>
          <Route
            exact={true}
            path='/login'
            component={Login}
          />
        </Switch>
      </Base>
    ))}
  />
)

const privateRoutes = (
  <Route
    path='/dashboard'
    component={PrivateRoute(() => (
      <Switch>
        <Route
          exact={true}
          path='/dashboard'
          component={Dashboard}
        />
      </Switch>
    ))}
  />
)

render(
  <StoreProvider store={store} >
    <IntlProvider locale={locale.code} messages={locale.messages} >
      <LocaleProvider locale={locale.antd} >
        <ThemeProvider theme={process.env.PMAC_THEME} >
          <Router history={history} >
            <Switch>
              <Redirect exact={true} from='/' to='/dashboard' />
              <Redirect
                exact={true}
                from='/dashboard/hospitals'
                to='/dashboard/hospitals/1'
              />
              {privateRoutes}
              {publicRoutes}
            </Switch>
          </Router>
        </ThemeProvider>
      </LocaleProvider>
    </IntlProvider>
  </StoreProvider>,
  document.getElementById('content')
)
