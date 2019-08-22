import React, { Component } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import { getAllGames } from "../lib/api/gameApi"

import DynamoDbGame from "../models/DynamoDbGame"

import GameStore from "../store/GameStore"

// import PlaceholderImage from "placeholder.jpg"

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
        headerImage: "",
        year: -1
      }
    }

    this._getGameData = this._getGameData.bind(this)
    this._getDescriptionDisplay = this._getDescriptionDisplay.bind(this)
    this._getScreenshotsDisplay = this._getScreenshotsDisplay.bind(this)
  }

  componentDidMount() {
    const pathParts = this.props.location.pathname.split("/")
    const gameName = pathParts[pathParts.length - 1]
    this._getGameData(gameName)
  }

  render() {
    const descriptionDisplay = this._getDescriptionDisplay()
    const screenshotsDisplay = this._getScreenshotsDisplay()
    const coverImage = `/images/games/${this.state.game.tile_image}`

    return (
      <div className="content-wrapper">
        <div className="media-info-container">
          <div className="column-left">
            <img
              src={coverImage}
              alt={this.state.game.game_name}
              className="tile-image"
            />
          </div>
          <div className="column-right">
            <h1>{this.state.game.game_name}</h1>
            {descriptionDisplay}
            {screenshotsDisplay}
          </div>
        </div>
        <Link to="../" className="link-back">
          Back to main page
        </Link>
      </div>
    )
  }

  async _getGameData(gameName: string) {
    let gameData: DynamoDbGame | undefined
    if (GameStore.games.length < 1) {
      const games: DynamoDbGame[] = await getAllGames()
      GameStore.games = games

      gameData = games.find(game => game.game_name === gameName)
    } else {
      gameData = GameStore.games.find(game => game.game_name === gameName)
    }

    if (typeof gameData === "undefined") {
      console.log("Could not find data for game")
      return
    }

    this.setState({ game: gameData })
  }

  _getDescriptionDisplay(): JSX.Element {
    const descriptionDisplay: JSX.Element = (
      <ReactMarkdown source={this.state.game.description} escapeHtml={false} />
    )

    return descriptionDisplay
  }

  _getScreenshotsDisplay() {
    if (typeof this.state.game.screenshots === "undefined") {
      return undefined
    }
    // console.log(`/images/games/${screenshot}`)
    const screenshotsDisplay: JSX.Element[] = this.state.game.screenshots.map(
      (screenshot, index) => {
        let image = `/images/games/${screenshot}`

        return (
          <div
            className="screenshot-image-container"
            key={`${this.state.game.game_name}${index}`}
          >
            <img
              src={image}
              alt={`${this.state.game.game_name}${index}`}
              className="screenshot-image"
            />
          </div>
        )
      }
    )
    return (
      <div className="screenshots-image-container">{screenshotsDisplay}</div>
    )
  }
}
