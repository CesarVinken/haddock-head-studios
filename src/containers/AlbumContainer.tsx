import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { getAllAlbums } from '../lib/api/albumApi'

import DynamoDbAlbum from '../models/DynamoDbAlbum'
import AlbumStore from '../store/AlbumStore'
import AlbumTrack from './AlbumTrack'

type MyState = { isLoading: boolean; album: DynamoDbAlbum }

interface AlbumProps extends RouteComponentProps<any>, React.Props<any> {}

export default class AlbumContainer extends Component<AlbumProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true,
      album: {
        album_id: '',
        album_name: '',
        description: '',
        year: -1,
        tracks: []
      }
    }

    this._getAlbumData = this._getAlbumData.bind(this)
    this._getTracksDisplay = this._getTracksDisplay.bind(this)
    this._getDescriptionDisplay = this._getDescriptionDisplay.bind(this)
  }

  componentDidMount() {
    const pathParts = this.props.location.pathname.split('/')
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
        <div className="content-centerer">
          <div className="content-container">
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
                {this.state.isLoading && <div>Loading...</div>}
                {descriptionDisplay}
                <strong>Track Listening:</strong>
                <ul className="tracks-container">{tracksDisplay}</ul>
              </div>
            </div>
          </div>
        </div>
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

    if (typeof albumData === 'undefined') {
      console.log('Could not find data for album')
      return
    }

    this.setState({ isLoading: false, album: albumData })
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
        return <AlbumTrack track={dbTrack} key={dbTrack.track_number}
        ></AlbumTrack>
      }
    )
    return (
      <div>
        <div className="track-wrapper track-header">
          <div className="audio-sample-header">
            <strong>Sample</strong>
          </div>
          <div className="track-content-wrapper">
            <div className="track-name-header">
              <strong>Title</strong>
            </div>
            <div className="track-length-header">
              <strong>Time</strong>
            </div>
          </div>
        </div>
        {tracksDisplay}
      </div>
    )
  }
}
