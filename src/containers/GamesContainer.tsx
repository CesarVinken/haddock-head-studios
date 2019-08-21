import React, { Component } from "react"

import { getAllGames } from "../lib/api/gameApi"

import DynamoDbGame from "../models/DynamoDbGame"

import GameStore from "../store/GameStore"
import GameMediaTile from "./tiles/GameMediaTile"

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
      <div className="content-wrapper">
        <div className="content-centerer">
          <h1>Games</h1>
          {gamesDisplay}
        </div>
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
      const image: string = game.tile_image
        ? game.tile_image
        : "placeholder.jpg"
      return (
        <GameMediaTile
          image={image}
          title={game.game_name}
          year={albumYearDisplay}
          key={game.game_id}
        />
      )
    })
    return <ul className="tiles-container">{gameDisplay}</ul>
  }
}
