import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./containers/Home"
import Album from "./containers/AlbumContainer"
import Albums from "./containers/AlbumsContainer"
import Game from "./containers/GameContainer"
import Games from "./containers/GamesContainer"

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/albums" exact component={Albums} />
    <Route path="/albums/:albumName" exact component={Album} />
    <Route path="/games" exact component={Games} />
    <Route path="/games/:gameName" exact component={Game} />
  </Switch>
)
