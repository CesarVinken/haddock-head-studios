import React, { Component } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import { getAlbum } from "../lib/api/albumApi"
import { secondsToStringTime } from "../lib/util/helpers"

import DynamoDbAlbum from "../models/DynamoDbAlbum"
import Track from "../models/Track"

type MyState = { album: DynamoDbAlbum }

interface AlbumProps extends RouteComponentProps<any>, React.Props<any> {}

export default class AlbumContainer extends Component<AlbumProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      album: {
        album_id: "",
        album_name: "",
        description: "",
        year: -1,
        tracks: []
      }
    }

    this._getAlbumData = this._getAlbumData.bind(this)
    this._getTracksDisplay = this._getTracksDisplay.bind(this)
    this._getDescriptionDisplay = this._getDescriptionDisplay.bind(this)
  }

  componentDidMount() {
    const pathParts = this.props.location.pathname.split("/")
    const albumName = pathParts[pathParts.length - 1]
    this._getAlbumData(albumName)
  }

  render() {
    const tracksDisplay = this._getTracksDisplay()
    const descriptionDisplay = this._getDescriptionDisplay()

    return (
      <div className="home">
        <h1>-{this.state.album.album_name}-</h1>
        Description:
        {descriptionDisplay}
        Tracks:
        <ul className="tracks">{tracksDisplay}</ul>
        <Link to="../albums">Back</Link>
      </div>
    )
  }

  async _getAlbumData(albumName: string) {
    const albumData: DynamoDbAlbum = await getAlbum(albumName)
    this.setState({ album: albumData })
  }

  _getDescriptionDisplay(): JSX.Element {
    const descriptionDisplay: JSX.Element = (
      <ReactMarkdown source={this.state.album.description} />
    )
    return descriptionDisplay
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
        console.log("track", track)
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
