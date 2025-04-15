import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/MapWithBottomSheet.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = { lat: 52.370216, lng: 4.895168 };

const surfSpots = [
  {
    id: 1,
    name: 'Scheveningen',
    position: { lat: 52.1085, lng: 4.2739 },
    waveHeight: '1,8 m',
    windDirection: 'NW',
    crowd: 'Hoog'
  },
  {
    id: 2,
    name: 'Zandvoort',
    position: { lat: 52.3715, lng: 4.5337 },
    waveHeight: '1,2 m',
    windDirection: 'W',
    crowd: 'Gemiddeld'
  }
];

export default function MapWithBottomSheet() {
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleMarkerClick = (spot) => {
    setSelectedSpot(spot);
  };

  const handleCloseSheet = () => {
    setSelectedSpot(null);
  };

  return (
    <div className="page-container">
      <header className="app-header">
        <div className="logo">LOGO</div>
        <div className="hamburger">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </svg>
        </div>
      </header>

      <div className="map-wrapper">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={9}
          >
            {surfSpots.map((spot) => (
              <Marker
                key={spot.id}
                position={spot.position}
                onClick={() => handleMarkerClick(spot)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className={`bottom-sheet ${selectedSpot ? 'show' : ''}`}>
        {selectedSpot && (
          <div className="sheet-content">
            <div className="placeholder-image" />

            <h2 className="spot-title">{selectedSpot.name}</h2>
            <p className="spot-info">Golfhoogte: {selectedSpot.waveHeight}</p>
            <p className="spot-info">Windrichting: {selectedSpot.windDirection}</p>
            <p className="spot-info">Drukte: {selectedSpot.crowd}</p>

            <h3 className="voorzieningen-title">Voorzieningen</h3>
            <div className="voorzieningen-placeholder"></div>
            <div className="voorzieningen-placeholder"></div>

            <button className="meerinfo-button">
              Meer info
            </button>

            <button className="close-button" onClick={handleCloseSheet}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
