import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Album extends Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="home">
        <h1>-Album name-</h1>
        <div className="tracks" />
      </div>
    )
  }
}
