import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Home extends Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="Home">
        <div>
          <Link to="/games">Games</Link>
        </div>
        <div>
          <Link to="/albums">Albums</Link>
        </div>
      </div>
    )
  }
}
