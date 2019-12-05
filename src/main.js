import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import NotFound from './NotFound'
export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <div>Main</div>
            }}
          ></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    )
  }
}
