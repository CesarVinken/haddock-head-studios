import React, { Component } from 'react'
import DynamoDbTrack from '../models/DynamoDbTrack'
import { secondsToStringTime } from '../lib/util/helpers'

interface IAlbumTrack {
  track: DynamoDbTrack
}

export default class AlbumTrack extends Component<IAlbumTrack> {
  render() {
    const audioSample: JSX.Element = this.props.track.track_audio ? (
      <div className="audio-sample">
        <a
          href={this.props.track.track_audio}
          target="_blank"
          rel="noopener noreferrer"
          className="audio-sample-link"
        >
          <img
            src={'./playsample.png'}
            alt="playback"
            className="audio-sample-image"
          ></img>
        </a>
      </div>
    ) : (
      <div className="audio-sample"></div>
    )
    const trackLength: String = this.props.track.track_length
      ? `(${secondsToStringTime(this.props.track.track_length)})`
      : '-'
    const trackName: JSX.Element = this.props.track.track_audio ? (
      <div className="track-name">
        <a
          href={this.props.track.track_audio}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{this.props.track.track_name}</strong>
        </a>
      </div>
    ) : (
      <div className="track-name">{this.props.track.track_name}</div>
    )

    return (
      <div className="track-wrapper">
        {audioSample}
        <div className="track-number">{this.props.track.track_number}.</div>
        <div className="track-content-wrapper">
          {trackName}
          <div className="track-length">{trackLength}</div>
        </div>
      </div>
    )
  }
}
