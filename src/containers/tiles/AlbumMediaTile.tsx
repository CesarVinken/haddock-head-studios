import * as React from "react"
import { MediaTileProps, MediaTileState, MediaTile } from "./MediaTile"
import { Link } from "react-router-dom"

export interface AlbumMediaTileProps extends MediaTileProps {}

export interface AlbumMediaTileState extends MediaTileState {}

class AlbumMediaTile extends MediaTile<
  AlbumMediaTileProps,
  AlbumMediaTileState
> {
  constructor(props: AlbumMediaTileProps) {
    super(props)
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
            pathname: `albums/${this.state.title}`
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

export default AlbumMediaTile
