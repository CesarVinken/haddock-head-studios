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
        <div className="tile-image-overlay" />
        <div className="tile-text-container">
          <Link
            to={{
              pathname: `albums/${this.state.title}`
            }}
            className="tile-title"
          >
            {this.state.title}
          </Link>
          {this.state.year}
        </div>
      </li>
    )
  }
}

export default AlbumMediaTile
