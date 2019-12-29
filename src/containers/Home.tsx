import React, { Component } from 'react'
import Albums from './AlbumsContainer'
import Games from './GamesContainer'
import { runSeed } from '../data/seed'
import MainHeader from './MainHeader'

export default class Home extends Component {
  render() {
    return (
      <div className="content-wrapper">
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
