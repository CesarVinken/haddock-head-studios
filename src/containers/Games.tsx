import React, { Component } from "react"

export default class Games extends Component {
  constructor(props: any) {
    super(props)

    this.state = {
      albumInfo: []
    }
  }

  render() {
    return <div className="Home">Games</div>
  }
}
