import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const bins = [
  { id: 1, position: [13.0827, 80.2707], fill: 'green', fillPercent: 30 },
  { id: 2, position: [13.085, 80.271], fill: 'yellow', fillPercent: 60 },
  { id: 3, position: [13.087, 80.275], fill: 'red', fillPercent: 90 },
];

const MapComponent = () => (
  <MapContainer center={[13.0827, 80.2707]} zoom={14} style={{ height: '500px', flex: 1 }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {bins.map(bin => (
      <CircleMarker key={bin.id} center={bin.position} radius={15} color={bin.fill} fillOpacity={0.8}>
        <Popup>Bin is {bin.fillPercent}% full</Popup>
      </CircleMarker>
    ))}
  </MapContainer>
);

export default MapComponent;
