// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap
// } from 'react-leaflet'

// import React, { useEffect } from 'react'
// function FixMapSize() {

//   const map = useMap()

//   useEffect(() => {

//     setTimeout(() => {

//       map.invalidateSize()

//     }, 300)

//   }, [map])

//   return null
// }

// function LocationMarker({
//   location,
//   setLocation,
//   onLocationSelect
// }) {

//   useMapEvents({

//     click(e) {

//   const lat =
//     e.latlng.lat

//   const lng =
//     e.latlng.lng

//   setLocation({
//     lat,
//     lng
//   })

//  if (
//   onLocationSelect
// ) {

//   onLocationSelect(
//     lat,
//     lng
//   )
// }
// }
//   })

//   return location ? (
//     <Marker position={[
//       location.lat,
//       location.lng
//     ]} />
//   ) : null
// }

// function RecenterMap({
//   location
// }) {

//   const map = useMap()

//   React.useEffect(() => {

//     if (location) {

//       map.setView(

//         [
//           location.lat,
//           location.lng
//         ],

//         16
//       )
//     }

//   }, [location, map])

//   return null
// }

// export default function LocationPicker({
//   location,
//   setLocation,
//   onLocationSelect
// }) {

//   return (

// <MapContainer
//   center={
//     location
//       ? [location.lat, location.lng]
//       : [18.5204, 73.8567]
//   }
//   zoom={16}
//   style={{
//     height: '500px',
//     width: '100%',
//     borderRadius: '20px'
//   }}
// >

//   <FixMapSize />

//   <TileLayer
//     attribution="&copy; OpenStreetMap"
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />

//   <RecenterMap location={location} />

//   <LocationMarker
//     location={location}
//     setLocation={setLocation}
//     onLocationSelect={onLocationSelect}
//   />

// </MapContainer>
//   )
// }

import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
})

function DraggableMarker({ location, setLocation, onLocationSelect }) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat

      const lng = e.latlng.lng

      setLocation({
        lat,
        lng,
      })

      onLocationSelect(lat, lng)
    },
  })

  if (!location) return null

  return (
    <Marker
      draggable
      icon={markerIcon}
      position={[location.lat, location.lng]}
      eventHandlers={{
        dragend: (e) => {
          const pos = e.target.getLatLng()

          setLocation({
            lat: pos.lat,
            lng: pos.lng,
          })

          onLocationSelect(pos.lat, pos.lng)
        },
      }}
    />
  )
}

export default function LocationPicker({ location, setLocation, onLocationSelect }) {
  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : [18.5204, 73.8567]}
      zoom={17}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '20px',
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <DraggableMarker
        location={location}
        setLocation={setLocation}
        onLocationSelect={onLocationSelect}
      />
    </MapContainer>
  )
}
