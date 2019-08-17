import React, { Component } from "react"
import { Link } from "react-router-dom"

import DynamoDbGame from "../models/DynamoDbGame"
import { getAllGames } from "../lib/api/gameApi"

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
    const games: DynamoDbGame[] = await getAllGames()
    this.setState({ games })
  }

  _getGameDisplay() {
    const gameDisplay: JSX.Element[] = this.state.games.map(game => {
      return (
        <li className="game" key={game.game_name}>
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
