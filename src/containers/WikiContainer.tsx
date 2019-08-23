import React, { Component } from "react"
import { RouteComponentProps } from "react-router-dom"

type MyState = { isLoading: boolean }

interface GameProps extends RouteComponentProps<any>, React.Props<any> {}

export default class GameContainer extends Component<GameProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {}

  render() {
    return <div className="content-wrapper">Wiki</div>
  }
}
