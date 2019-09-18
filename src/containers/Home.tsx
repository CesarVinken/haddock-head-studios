import React, { Component } from 'react'
import Albums from './AlbumsContainer'
import Games from './GamesContainer'
import { runSeed } from '../data/seed'

export default class Home extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="title-wrapper">
          <div className="title-container">
            <h1>Haddock Head Studios</h1>
            <h3 className="subtitle">Music and Games</h3>
            {/* {'~~~~~~~~~~~~~~~'} */}
            {/* <hr></hr> */}
          </div>
        </div>
        <Albums />
        <Games />

        {/* <button
          onClick={e => {
            runSeed()
          }}
        >
          Seed
        </button> */}
      </div>
    )
  }
}
