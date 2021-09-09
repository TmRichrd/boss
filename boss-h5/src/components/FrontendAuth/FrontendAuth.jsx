import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
class FrontendAuth extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { routerConfig, location } = this.props
    const { pathname } = location
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    const targetRouterConfig = routerConfig.find(
      (item) => item.path == pathname
    )
    if (targetRouterConfig && !targetRouterConfig.auth && !token) {
      const { component } = targetRouterConfig
      return <Route exact path={pathname} component={component} />
    }
    if (token) {
      if (pathname === '/login') {
        return <Redirect to="/" />
      } else {
        if (targetRouterConfig) {
          return (
            <Route
              exact
              path={pathname}
              component={targetRouterConfig.component}
            />
          )
        } else {
          return <Redirect to="/404" />
        }
      }
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default FrontendAuth
