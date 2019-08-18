import * as React from "react"
import { MediaTileProps, MediaTileState, MediaTile } from "./MediaTile"
import { Link } from "react-router-dom"

export interface GameMediaTileProps extends MediaTileProps {
  // title: string
  // image: string
}

export interface GameMediaTileState extends MediaTileState {
  // title: string
  // image: string
}

class GameMediaTile extends MediaTile<GameMediaTileProps, GameMediaTileState> {
  constructor(props: GameMediaTileProps) {
    super(props)

    // this.state = {
    //   // title: props.title,
    //   // image: props.image
    // }
  }

  render() {
    return (
      <li className="tile" key={this.state.title}>
        <img
          src={this.state.image}
          alt={this.state.title}
          className="menu-tile"
        />
        <Link
          to={{
            pathname: `games/${this.state.title}`
          }}
        >
          {this.state.title}
        </Link>
        {this.state.year}
      </li>
    )
  }
}

export default GameMediaTile
