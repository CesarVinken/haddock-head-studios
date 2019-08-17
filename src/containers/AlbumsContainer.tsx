import React, { Component } from "react"
import { Link } from "react-router-dom"

import { getAllAlbums } from "../lib/api/albumApi"

import DynamoDbAlbum from "../models/DynamoDbAlbum"

type MyState = { albums: Array<DynamoDbAlbum> }

export default class AlbumsContainer extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      albums: []
    }
    this._getAllAlbums = this._getAllAlbums.bind(this)
    this._getAlbumDisplay = this._getAlbumDisplay.bind(this)

    this._handleInputChange = this._handleInputChange.bind(this)
  }

  componentDidMount() {
    this._getAllAlbums()
  }

  render() {
    const albumDisplay = this._getAlbumDisplay()
    return (
      <div className="Home">
        <div className="lander">
          <h1>Albums</h1>
          here are all albums:
          <ul className="albums">{albumDisplay}</ul>
        </div>
      </div>
    )
  }

  async _getAllAlbums() {
    const albums: DynamoDbAlbum[] = await getAllAlbums()
    this.setState({ albums })
  }

  _getAlbumDisplay() {
    const albumDisplay: JSX.Element[] = this.state.albums.map(album => {
      return (
        <li className="album" key={album.album_name}>
          <Link
            to={{
              pathname: `albums/${album.album_name}`
            }}
          >
            {album.album_name}
          </Link>
        </li>
      )
    })
    return <div>{albumDisplay}</div>
  }

  _handleInputChange(key: any, newValue: any) {
    this.setState({ [key]: newValue } as any)
  }
}
