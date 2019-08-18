import React, { Component } from "react"
import { Link } from "react-router-dom"

import { getAllGames } from "../lib/api/gameApi"

import DynamoDbGame from "../models/DynamoDbGame"

import GameStore from "../store/GameStore"
import GameMediaTile from "./tiles/GameMediaTile"
import PlaceholderImage from "../assets/placeholder.jpg"

type MyState = { games: Array<DynamoDbGame> }

export default class GamesContainer extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      games: []
    }
    this._getAllGames = this._getAllGames.bind(this)
    this._getGameDisplay = this._getGameDisplay.bind(this)
  }

  componentDidMount() {
    this._getAllGames()
  }

  render() {
    const gamesDisplay = this._getGameDisplay()
    return (
      <div className="home">
        <h1>Games</h1>
        here are all games:
        <ul className="games">{gamesDisplay}</ul>
        <Link to="../">Back</Link>
      </div>
    )
  }

  async _getAllGames() {
    if (GameStore.games.length < 1) {
      const games: DynamoDbGame[] = await getAllGames()

      this.setState({ games })
      GameStore.setGames(games)
    } else {
      console.log(typeof GameStore.games)
      this.setState({ games: GameStore.games })
    }
  }

  _getGameDisplay() {
    const gameDisplay: JSX.Element[] = this.state.games.map(game => {
      const albumYearDisplay: string = game.year ? ` (${game.year})` : ""
      const image: string = game.tile_image ? game.tile_image : PlaceholderImage
      return (
        <GameMediaTile
          image={image}
          title={game.game_name}
          year={albumYearDisplay}
        />
      )
    })
    return <div>{gameDisplay}</div>
  }
}
