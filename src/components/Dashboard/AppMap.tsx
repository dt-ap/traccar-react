import React, { FC, useState } from 'react';
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

const AppMap: FC = () => {
  const [zoom] = useState(17);
  
  const position: LatLngTuple = [-6.28970, 106.79604];

  return (
    <Map
      center={position}
      zoom={zoom}
      zoomControl={false}
      style={{ height: '100%' }}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup</Popup>
      </Marker>
    </Map>
  );
};

export default AppMap;
