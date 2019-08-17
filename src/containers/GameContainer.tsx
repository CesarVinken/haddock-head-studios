import React, { Component } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import { getGame } from "../lib/api/gameApi"

import DynamoDbGame from "../models/DynamoDbGame"

type MyState = { game: DynamoDbGame }

interface GameProps extends RouteComponentProps<any>, React.Props<any> {}

export default class GameContainer extends Component<GameProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      game: {
        game_id: "",
        game_name: "",
        description: "",
        year: -1
      }
    }

    this._getGameData = this._getGameData.bind(this)
    this._getDescriptionDisplay = this._getDescriptionDisplay.bind(this)
  }

  componentDidMount() {
    const pathParts = this.props.location.pathname.split("/")
    const gameName = pathParts[pathParts.length - 1]
    this._getGameData(gameName)
  }

  render() {
    const descriptionDisplay = this._getDescriptionDisplay()

    return (
      <div className="home">
        <h1>-{this.state.game.game_name}-</h1>
        Description:
        {descriptionDisplay}
        <Link to="../games">Back</Link>
      </div>
    )
  }

  async _getGameData(gameName: string) {
    const gameData: DynamoDbGame = await getGame(gameName)
    this.setState({ game: gameData })
  }

  _getDescriptionDisplay(): JSX.Element {
    const descriptionDisplay: JSX.Element = (
      <ReactMarkdown source={this.state.game.description} />
    )
    return descriptionDisplay
  }
}
