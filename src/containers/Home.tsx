import React, { Component } from "react"
import { Link } from "react-router-dom"
import Albums from "./AlbumsContainer"
import Games from "./GamesContainer"
import { runSeed } from "../data/seed"
// runSeed
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Welcome to Haddock Head Studios</h1>
        <Albums />
        <Games />
        {/* <div>
          <Link to="/games">Games</Link>
        </div>
        <div>
          <Link to="/albums">Albums</Link>
        </div> */}
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
