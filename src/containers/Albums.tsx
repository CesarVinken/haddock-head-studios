import React, { Component } from "react"
import { Link } from "react-router-dom"

import { getAlbum, getAllAlbums } from "../lib/api/albumApi"

import DynamoDbAlbum from "../models/DynamoDbAlbum"
type MyState = { albums: Array<DynamoDbAlbum> }

export default class Albums extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      albums: []
    }
    this._getAllAlbums = this._getAllAlbums.bind(this)
    // this._getAlbum = this._getAlbum.bind(this)
    this._getAlbumDisplay = this._getAlbumDisplay.bind(this)

    this._handleInputChange = this._handleInputChange.bind(this)
  }

  componentDidMount() {
    // get album info
    this._getAllAlbums()
  }

  render() {
    const albumDisplay = this._getAlbumDisplay()
    return (
      <div className="Home">
        <div className="lander">
          {/* <h1>Post</h1>
          <button
            className="button"
            onClick={() => {
              this._addAlbum("new album")
            }}
          >
            Add an album
          </button> */}
          <h1>Albums</h1>
          here are all albums:
          <ul className="albums">{albumDisplay}</ul>
          {/* {this.state.albums} */}
          {/* <button
            className="button"
            onClick={() => {
              this._getAllAlbums()
            }}
          >
            Get all albums
          </button> */}
          {/* <h1>Get one</h1>
          <input
            className="input"
            onChange={evt =>
              this._handleInputChange("albumName", evt.target.value)
            }
          />
          <button
            className="button"
            onClick={() => {
              this._getAlbum()
            }}
          >
            Get album
          </button> */}
        </div>
      </div>
    )
  }

  _getAlbum() {
    //getAlbum(this.state.albumName)
    // const sanatisedAlbumName = this.state.albumName.replace(/ /g, "_")
    // console.log(`Trying to get album "${sanatisedAlbumName}"`)
    // Axios({
    //   method: "get",
    //   url: `${PROXY_URL}https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album/${sanatisedAlbumName}`,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // })
    //   .then(res => {
    //     console.log(res.data[0])
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   })
  }

  async _getAllAlbums() {
    const albums: DynamoDbAlbum[] = await getAllAlbums()
    this.setState({ albums })
  }

  _getAlbumDisplay() {
    const albumDisplay: JSX.Element[] = this.state.albums.map(album => {
      return (
        <li className="album" key={album.album_name}>
          <Link to={album.album_name}>{album.album_name}</Link>
        </li>
      )
    })
    return <div>{albumDisplay}</div>
  }

  _handleInputChange(key: any, newValue: any) {
    this.setState({ [key]: newValue } as any)
  }
}
