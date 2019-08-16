import React, { Component } from "react"
import Axios from "axios"
import uuid from "uuid"

type MyState = { albumName: string }

const PROXY_URL = "https://cors-anywhere.herokuapp.com/"

export default class Albums extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      albumName: ""
    }
    this._addAlbum = this._addAlbum.bind(this)
    this._getAllAlbums = this._getAllAlbums.bind(this)
    this._getAlbum = this._getAlbum.bind(this)

    this._handleInputChange = this._handleInputChange.bind(this)
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Post</h1>
          <button
            className="button"
            onClick={() => {
              this._addAlbum("new album")
            }}
          >
            Add an album
          </button>
          <h1>Get all</h1>
          <button
            className="button"
            onClick={() => {
              this._getAllAlbums()
            }}
          >
            Get all albums
          </button>
          <h1>Get one</h1>
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
          </button>
        </div>
      </div>
    )
  }

  _addAlbum(albumData: any) {
    console.log("Trying to post")
    const albumId: String = uuid.v1()

    Axios({
      method: "post",
      url: `${PROXY_URL}https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        albumId,
        albumName: "Lauras"
      }
    })
      .then(res => {
        console.log(res.data.body)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  _getAlbum() {
    const sanatisedAlbumName = this.state.albumName.replace(/ /g, "_")
    console.log(`Trying to get album "${sanatisedAlbumName}"`)
    Axios({
      method: "get",
      url: `${PROXY_URL}https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album/${sanatisedAlbumName}`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => {
        console.log(res.data[0])
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  _getAllAlbums() {
    console.log("Trying to get all albums")
    Axios({
      method: "get",
      url: `${PROXY_URL}https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/album`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(res => {
      console.log(res.data.Items)
    })
  }

  _handleInputChange(key: any, newValue: any) {
    this.setState({ [key]: newValue } as any)
  }
}
