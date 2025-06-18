import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "../styles/MapWithBottomSheet.css";

const mapContainerStyle = { width: "100%", height: "100%" };
const center = { lat: 52.370216, lng: 4.895168 };
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function MapWithBottomSheet() {
  const [surfSpots, setSurfSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSurfSpots() {
      try {
        const resp = await axios.get(`${API_BASE_URL}/SurfSpot`);
        const spots = resp.data.map((s) => ({
          id: s.id,
          name: s.name,
          position: { lat: s.latitude, lng: s.longitude },
        }));
        setSurfSpots(spots);
      } catch (e) {
        console.error(e);
        setError("Kon surfspots niet laden.");
      } finally {
        setLoading(false);
      }
    }
    fetchSurfSpots();
  }, []);

  const handleMarkerClick = (spot) => {
    navigate(`/spot/${spot.id}`);
  };

  if (loading) return <div className="loading">Laden…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <header className="app-header">
        <div className="logo">LOGO</div>
        <button className="hamburger" aria-label="Menu">☰</button>
      </header>

      <div className="map-wrapper">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={9}>
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
    </div>
  );
}
