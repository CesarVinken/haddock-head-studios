import React, { Component } from "react"
import { Link } from "react-router-dom"

import { getAllAlbums } from "../lib/api/albumApi"

import DynamoDbAlbum from "../models/DynamoDbAlbum"

import AlbumStore from "../store/AlbumStore"

import PlaceholderImage from "../assets/placeholder.jpg"

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
      <div className="home">
        <h1>Albums</h1>
        here are all albums:
        <ul className="albums">{albumDisplay}</ul>
        <Link to="../">Back</Link>
      </div>
    )
  }

  async _getAllAlbums() {
    // After the first time, albums are stored in the AlbumStore, and don't need to be retrieved from the database
    if (AlbumStore.albums.length < 1) {
      const albums: DynamoDbAlbum[] = await getAllAlbums()

      this.setState({ albums })
      AlbumStore.setAlbums(albums)
    } else {
      console.log(typeof AlbumStore.albums)
      this.setState({ albums: AlbumStore.albums })
    }
  }

  _getAlbumDisplay() {
    const albumDisplay: JSX.Element[] = this.state.albums
      .sort((albumA, albumB) => (albumA.year > albumB.year ? 1 : -1))
      .map(album => {
        const albumYearDisplay = album.year ? ` (${album.year})` : ""

        return (
          <li className="album" key={album.album_name}>
            <img
              src={PlaceholderImage}
              // src={album.tile_image}
              alt={album.album_name}
              className="menu-tile"
            />
            <Link
              to={{
                pathname: `albums/${album.album_name}`
              }}
            >
              {album.album_name}
            </Link>
            {albumYearDisplay}
          </li>
        )
      })
    return <div>{albumDisplay}</div>
  }

  _handleInputChange(key: any, newValue: any) {
    this.setState({ [key]: newValue } as any)
  }
}
