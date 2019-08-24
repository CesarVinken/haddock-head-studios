import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./containers/Home"
import Album from "./containers/AlbumContainer"
import Game from "./containers/GameContainer"
import Wiki from "./containers/WikiContainer"

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/albums/:albumName" exact component={Album} />
    <Route path="/games/:gameName" exact component={Game} />
    <Route path="/wiki" component={Wiki} />
  </Switch>
)
