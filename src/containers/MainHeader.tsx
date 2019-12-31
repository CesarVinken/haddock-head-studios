import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MainHeader extends Component {
  render() {
    return (
      <div className="title-wrapper">
        <Link to="../" className="link-back">
          <div className="title-container">
            <h1>Haddock Head Studios</h1>
            <h3 className="subtitle">Music and Games</h3>
          </div>
        </Link>
      </div>
    )
  }
}
