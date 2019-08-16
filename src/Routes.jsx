import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./containers/Home"
import Albums from "./containers/Albums"
import Games from "./containers/Games"

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/albums" exact component={Albums} />
    <Route path="/games" exact component={Games} />
  </Switch>
)
