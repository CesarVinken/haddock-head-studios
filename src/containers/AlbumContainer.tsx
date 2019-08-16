import React, { Component } from "react"
import { RouteComponentProps } from "react-router-dom"

import { getAlbum } from "../lib/api/albumApi"
import DynamoDbAlbum from "../models/DynamoDbAlbum"
import Track from "../models/Track"

import { secondsToStringTime } from "../lib/util/helpers"

type MyState = { album: DynamoDbAlbum }

interface AlbumProps extends RouteComponentProps<any>, React.Props<any> {}

export default class AlbumContainer extends Component<AlbumProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      album: {
        album_id: "",
        album_name: "",
        year: -1,
        tracks: []
      }
    }

    this._getAlbumData = this._getAlbumData.bind(this)
  }

  componentDidMount() {
    const pathParts = this.props.location.pathname.split("/")
    const albumName = pathParts[pathParts.length - 1]
    this._getAlbumData(albumName)
    this._getTracksDisplay()
  }

  render() {
    const tracksDisplay = this._getTracksDisplay()

    return (
      <div className="home">
        <h1>-{this.state.album.album_name}-</h1>
        Tracks:
        <ul className="tracks">{tracksDisplay}</ul>
      </div>
    )
  }

  async _getAlbumData(albumName: string) {
    const albumData: DynamoDbAlbum = await getAlbum(albumName)
    this.setState({ album: albumData })
  }

  _getTracksDisplay() {
    const tracksDisplay: JSX.Element[] = this.state.album.tracks.map(
      dbTrack => {
        const trackLength: string = secondsToStringTime(dbTrack.track_length)

        const track: Track = {
          trackNumber: dbTrack.track_number,
          trackName: dbTrack.track_name,
          trackLength
        }
        return (
          <li
            className="track"
            key={`${this.state.album.album_id}${track.trackNumber}`}
          >
            {track.trackNumber}. {track.trackName} ({track.trackLength})
          </li>
        )
      }
    )
    return <div>{tracksDisplay}</div>
  }
}
