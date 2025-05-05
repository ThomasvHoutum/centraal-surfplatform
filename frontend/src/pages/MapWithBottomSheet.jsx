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
  },
  {
    id: 3,
    name: 'Wijk aan Zee',
    position: { lat: 52.4879, lng: 4.6150 },
    waveHeight: '1,9 m',
    windDirection: 'NW',
    crowd: 'Hoog'
  },
  {
    id: 4,
    name: 'Noordwijk',
    position: { lat: 52.2447, lng: 4.4331 },
    waveHeight: '1,4 m',
    windDirection: 'WZW',
    crowd: 'Gemiddeld'
  },
  {
    id: 5,
    name: 'IJmuiden',
    position: { lat: 52.4619, lng: 4.5655 },
    waveHeight: '1,7 m',
    windDirection: 'NW',
    crowd: 'Laag'
  },
  {
    id: 6,
    name: 'Brouwersdam',
    position: { lat: 51.7769, lng: 3.8714 },
    waveHeight: '1,3 m',
    windDirection: 'W',
    crowd: 'Gemiddeld'
  },
  {
    id: 7,
    name: 'Domburg',
    position: { lat: 51.5617, lng: 3.5003 },
    waveHeight: '2,0 m',
    windDirection: 'WNW',
    crowd: 'Hoog'
  },
  {
    id: 8,
    name: 'Hoek van Holland',
    position: { lat: 51.9769, lng: 4.1167 },
    waveHeight: '1,6 m',
    windDirection: 'NW',
    crowd: 'Gemiddeld'
  },
  {
    id: 9,
    name: 'Kijkduin',
    position: { lat: 52.0639, lng: 4.2303 },
    waveHeight: '1,5 m',
    windDirection: 'NW',
    crowd: 'Laag'
  },
  {
    id: 10,
    name: 'Bloemendaal aan Zee',
    position: { lat: 52.4067, lng: 4.5364 },
    waveHeight: '1,7 m',
    windDirection: 'W',
    crowd: 'Hoog'
  },
  {
    id: 11,
    name: 'Texel - Paal 9',
    position: { lat: 53.0580, lng: 4.7162 },
    waveHeight: '1,8 m',
    windDirection: 'WNW',
    crowd: 'Gemiddeld'
  },
  {
    id: 12,
    name: 'Texel - Paal 17',
    position: { lat: 53.1112, lng: 4.7543 },
    waveHeight: '2,1 m',
    windDirection: 'NW',
    crowd: 'Hoog'
  },
  {
    id: 13,
    name: 'Vlissingen',
    position: { lat: 51.4426, lng: 3.5739 },
    waveHeight: '1,4 m',
    windDirection: 'ZW',
    crowd: 'Laag'
  },
  {
    id: 14,
    name: 'Callantsoog',
    position: { lat: 52.8236, lng: 4.6997 },
    waveHeight: '1,5 m',
    windDirection: 'W',
    crowd: 'Laag'
  },
  {
    id: 15,
    name: 'Katwijk',
    position: { lat: 52.2044, lng: 4.3984 },
    waveHeight: '1,3 m',
    windDirection: 'WZW',
    crowd: 'Gemiddeld'
  },
  {
    id: 16,
    name: 'Petten',
    position: { lat: 52.7665, lng: 4.6596 },
    waveHeight: '1,6 m',
    windDirection: 'NW',
    crowd: 'Laag'
  },
  {
    id: 17,
    name: 'Julianadorp',
    position: { lat: 52.8798, lng: 4.7484 },
    waveHeight: '1,7 m',
    windDirection: 'WNW',
    crowd: 'Gemiddeld'
  },
  {
    id: 18,
    name: 'Hargen aan Zee',
    position: { lat: 52.7107, lng: 4.6587 },
    waveHeight: '1,5 m',
    windDirection: 'W',
    crowd: 'Laag'
  },
  {
    id: 19,
    name: 'Egmond aan Zee',
    position: { lat: 52.6192, lng: 4.6185 },
    waveHeight: '1,6 m',
    windDirection: 'NW',
    crowd: 'Gemiddeld'
  },
  {
    id: 20,
    name: 'Maasvlakte',
    position: { lat: 51.9486, lng: 3.9775 },
    waveHeight: '2,2 m',
    windDirection: 'NW',
    crowd: 'Gemiddeld'
  },
  {
    id: 21,
    name: 'Rockanje',
    position: { lat: 51.8517, lng: 4.0953 },
    waveHeight: '1,2 m',
    windDirection: 'ZW',
    crowd: 'Laag'
  },
  {
    id: 22,
    name: 'Velsen-Noord',
    position: { lat: 52.4707, lng: 4.6111 },
    waveHeight: '1,5 m',
    windDirection: 'W',
    crowd: 'Laag'
  },
  {
    id: 23,
    name: 'Ter Heijde',
    position: { lat: 52.0183, lng: 4.1743 },
    waveHeight: '1,3 m',
    windDirection: 'NW',
    crowd: 'Laag'
  },
  {
    id: 24,
    name: 'Ouddorp',
    position: { lat: 51.8113, lng: 3.9363 },
    waveHeight: '1,5 m',
    windDirection: 'WZW',
    crowd: 'Gemiddeld'
  },
  {
    id: 25,
    name: 'Nieuwvliet-Bad',
    position: { lat: 51.3721, lng: 3.4884 },
    waveHeight: '1,4 m',
    windDirection: 'ZW',
    crowd: 'Laag'
  },
  {
    id: 26,
    name: 'Bergen aan Zee',
    position: { lat: 52.6707, lng: 4.6301 },
    waveHeight: '1,6 m',
    windDirection: 'WNW',
    crowd: 'Gemiddeld'
  },
  {
    id: 27,
    name: 'Westenschouwen',
    position: { lat: 51.6821, lng: 3.6942 },
    waveHeight: '1,3 m',
    windDirection: 'WZW',
    crowd: 'Laag'
  },
  {
    id: 28,
    name: 'Oostvoorne',
    position: { lat: 51.9087, lng: 4.0739 },
    waveHeight: '1,2 m',
    windDirection: 'ZW',
    crowd: 'Laag'
  },
  {
    id: 29,
    name: 'Vrouwenpolder',
    position: { lat: 51.5862, lng: 3.5762 },
    waveHeight: '1,4 m',
    windDirection: 'W',
    crowd: 'Gemiddeld'
  },
  {
    id: 30,
    name: 'Texel - De Koog',
    position: { lat: 53.0933, lng: 4.7556 },
    waveHeight: '1,9 m',
    windDirection: 'NW',
    crowd: 'Hoog'
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
