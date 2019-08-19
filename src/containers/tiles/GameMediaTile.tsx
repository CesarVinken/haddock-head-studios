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
      <li className="tile-container" key={this.state.title}>
        <img
          src={this.state.image}
          alt={this.state.title}
          className="tile-image"
        />
        <Link
          to={{
            pathname: `games/${this.state.title}`
          }}
          className="tile-image-overlay"
        >
          <div className="tile-text-container">
            <div className="tile-title">
              {this.state.title} {this.state.year}
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

export default GameMediaTile
