import * as React from 'react'
import { MediaTileProps, MediaTileState, MediaTile } from './MediaTile'
import { Link } from 'react-router-dom'

export interface AlbumMediaTileProps extends MediaTileProps {}

export interface AlbumMediaTileState extends MediaTileState {}

class AlbumMediaTile extends MediaTile<
  AlbumMediaTileProps,
  AlbumMediaTileState
> {
  render() {
    const tileImage = `/images/albums/${this.state.image}`
    return (
      <li className="tile-container" key={this.state.title}>
        <Link
          to={{
            pathname: `albums/${this.state.title}`
          }}
        >
          <img src={tileImage} alt={this.state.title} className="tile-image" />
          <div className="tile-image-overlay">
            <div className="tile-text-container">
              <div className="tile-title">
                {this.state.title} {this.state.year}
              </div>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

export default AlbumMediaTile
