import React, { Component } from "react"
import { Link, RouteComponentProps } from "react-router-dom"

import { getAlbum } from "../lib/api/albumApi"
import DynamoDbAlbum from "../models/DynamoDbAlbum"

type MyState = { album: DynamoDbAlbum }

interface AlbumProps extends RouteComponentProps<any>, React.Props<any> {}

export default class Album extends Component<AlbumProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      album: {
        album_id: "",
        album_name: ""
      }
    }

    this._getAlbumData = this._getAlbumData.bind(this)
  }

  componentDidMount() {
    const pathParts = this.props.location.pathname.split("/")
    const albumName = pathParts[pathParts.length - 1]
    this._getAlbumData(albumName)
  }

  render() {
    return (
      <div className="home">
        <h1>-{this.state.album.album_name}-</h1>
        <div className="tracks" />
      </div>
    )
  }

  async _getAlbumData(albumName: string) {
    const albumData: DynamoDbAlbum = await getAlbum(albumName)
    this.setState({ album: albumData })
  }
}
