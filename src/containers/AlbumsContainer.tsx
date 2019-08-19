import React, { Component } from "react"
import { Link } from "react-router-dom"

import { getAllAlbums } from "../lib/api/albumApi"

import DynamoDbAlbum from "../models/DynamoDbAlbum"

import AlbumStore from "../store/AlbumStore"

import PlaceholderImage from "../assets/placeholder.jpg"
import AlbumMediaTile from "./tiles/AlbumMediaTile"

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
      <div className="content-wrapper">
        <div className="content-centerer">
          <h1>Albums</h1>
          {albumDisplay}
          <Link to="../">Back</Link>
        </div>
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
        const albumYearDisplay: string = album.year ? ` (${album.year})` : ""
        const image: string = album.tile_image
          ? album.tile_image
          : PlaceholderImage
        return (
          <AlbumMediaTile
            image={image}
            title={album.album_name}
            year={albumYearDisplay}
            key={album.album_id}
          />
        )
      })
    return <ul className="tiles-container">{albumDisplay}</ul>
  }

  _handleInputChange(key: any, newValue: any) {
    this.setState({ [key]: newValue } as any)
  }
}
