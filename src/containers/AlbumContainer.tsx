import React, { Component } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import { getAllAlbums } from "../lib/api/albumApi"
import { secondsToStringTime } from "../lib/util/helpers"

import DynamoDbAlbum from "../models/DynamoDbAlbum"
import Track from "../models/Track"
import AlbumStore from "../store/AlbumStore"

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
    console.log(this.state.album)
    const tracksDisplay = this._getTracksDisplay()
    const descriptionDisplay = this._getDescriptionDisplay()

    const coverImage = `/images/albums/${this.state.album.tile_image}`

    return (
      <div className="content-wrapper">
        <div className="media-info-container">
          <div className="column-left">
            <img
              src={coverImage}
              alt={this.state.album.album_name}
              className="tile-image"
            />
          </div>
          <div className="column-right">
            <h1>{this.state.album.album_name}</h1>
            {descriptionDisplay}
            Tracks:
            <ul className="tracks-container">{tracksDisplay}</ul>
          </div>
        </div>
        <Link to="../" className="link-back">
          Back to main page
        </Link>
      </div>
    )
  }

  async _getAlbumData(albumName: string) {
    let albumData: DynamoDbAlbum | undefined
    if (AlbumStore.albums.length < 1) {
      const albums: DynamoDbAlbum[] = await getAllAlbums()
      AlbumStore.albums = albums

      albumData = albums.find(album => album.album_name === albumName)
    } else {
      albumData = AlbumStore.albums.find(
        album => album.album_name === albumName
      )
    }

    if (typeof albumData === "undefined") {
      console.log("Could not find data for album")
      return
    }

    this.setState({ album: albumData })
  }

  _getDescriptionDisplay(): JSX.Element {
    const descriptionDisplay: JSX.Element = (
      <ReactMarkdown source={this.state.album.description} escapeHtml={false} />
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
          trackAudio: dbTrack.track_audio,
          trackLength
        }

        const trackLengthDisplay: string = track.trackLength
          ? `(${track.trackLength})`
          : ""
        const fullLine: JSX.Element =
          track.trackAudio && track.trackAudio !== "" ? (
            <span>
              <a href={track.trackAudio} target="_blank">
                {track.trackName}
              </a>{" "}
              {trackLengthDisplay}
            </span>
          ) : (
            <span>
              {track.trackName} {trackLengthDisplay}
            </span>
          )

        return (
          <li
            className="track-title-line"
            key={`${this.state.album.album_id}${track.trackNumber}`}
          >
            {track.trackNumber}. {fullLine}
          </li>
        )
      }
    )
    return <div>{tracksDisplay}</div>
  }
}
