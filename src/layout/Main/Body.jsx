import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import routers from '@src/routers/index.js'
export default class Body extends Component {
  render() {
    return (
      <Switch>
        {routers.map((route, index) => {
          return <Route {...route} key={index} />
        })}
      </Switch>
    )
  }
}
