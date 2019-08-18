import React, { Component } from "react"
import { Link } from "react-router-dom"

import { getAllGames } from "../lib/api/gameApi"

import DynamoDbGame from "../models/DynamoDbGame"

import GameStore from "../store/GameStore"

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
      return (
        <li className="game" key={game.game_name}>
          <img
            src={game.tile_image}
            alt={game.game_name}
            className="menu-tile"
          />
          <Link
            to={{
              pathname: `games/${game.game_name}`
            }}
          >
            {game.game_name}
          </Link>
        </li>
      )
    })
    return <div>{gameDisplay}</div>
  }
}
