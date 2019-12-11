import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import MainLayout from './layout/Main/index.jsx'
import NotFound from './NotFound'
export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={MainLayout}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    )
  }
}
