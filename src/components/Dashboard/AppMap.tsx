import React, { FC, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import { positions } from 'store/selectors/markers';

const position: LatLngTuple = [-6.2897, 106.79604];

const AppMap: FC = () => {
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef<Map>(null);
  const markerPos = useSelector(positions);

  useEffect(() => {
    if (mapRef.current) {
      const l = mapRef.current.leafletElement;
      l.on('zoomend', () => {
        setZoom(l.getZoom());
      });
    }
  }, []);

  return (
    <Map
      center={position}
      zoom={zoom}
      ref={mapRef}
      maxZoom={20}
      minZoom={12}
      zoomControl={false}
      style={{ height: '100%' }}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerPos.map(m => {
        if (m.lat && m.long)
          return <Marker key={m.id} position={[m.lat, m.long]} />;
        return null;
      })}
    </Map>
  );
};

export default AppMap;
