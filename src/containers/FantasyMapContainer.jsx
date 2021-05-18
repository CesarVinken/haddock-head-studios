import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


function FantasyMap(){

  return (
      <MapContainer class="leaflet-container" center={[0, 0]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="/images/map/{z}_{x}_{y}.png"
        />
        {/* <Marker position={[0, 0]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
  )
}

export default class FantasyMapContainer extends Component {

  render() {
    return (
      <div>
        <FantasyMap /> 
      </div>
    )
  }
}
