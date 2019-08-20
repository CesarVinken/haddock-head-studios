import React, { Component } from "react"
import Albums from "./AlbumsContainer"
import Games from "./GamesContainer"
import { runSeed } from "../data/seed"

export default class Home extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <h1>Welcome to Haddock Head Studios</h1>
        <Albums />
        <Games />
        <button
          onClick={e => {
            runSeed()
          }}
        >
          Seed
        </button>
      </div>
    )
  }
}
