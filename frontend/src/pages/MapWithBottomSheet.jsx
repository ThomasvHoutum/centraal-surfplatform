import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faWind,
  faCloudSun,
  faWater,
  faUsers,
  faTimes,
  faChevronRight,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import MoreInfo from "../components/MoreInfo";
import "../styles/MapWithBottomSheet.css";

const mapContainerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 52.370216, lng: 4.895168 };
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://localhost:7107";

export default function MapWithBottomSheet() {
  const [surfSpots, setSurfSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const pick = (val) => (Array.isArray(val) ? val[0] : val);

  useEffect(() => {
    async function fetchSurfSpots() {
      try {
        const resp = await axios.get(`${API_BASE_URL}/SurfSpot/test`);
        const spots = resp.data.map((s) => ({
          id: s.id,
          name: s.name,
          position: { lat: s.latitude, lng: s.longitude },
          waveHeight: s.waveHeight ?? "—",
          windDirection: s.windDirection ?? "—",
          crowd: s.crowd ?? "—",
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

  const handleMarkerClick = async (spot) => {
    setSelectedSpot(spot);
    setShowMoreInfo(false);
    setWeatherData(null);
    setWeatherError(null);
    setWeatherLoading(true);

    try {
      const resp = await axios.get(`${API_BASE_URL}/Weather`, {
        params: {
          latitude: spot.position.lat,
          longitude: spot.position.lng,
        },
      });
      setWeatherData(resp.data);
    } catch (e) {
      console.error(e);
      setWeatherError("Kon weergegevens niet laden.");
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleCloseSheet = () => {
    setSelectedSpot(null);
    setShowMoreInfo(false);
  };

  const onAutocompleteLoad = (ac) => setAutocomplete(ac);
  const onPlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (place?.geometry?.location) {
      const loc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMapCenter(loc);
      mapRef.current?.panTo(loc);
      mapRef.current?.setZoom(12);
    }
    setSearchInput(place.formatted_address || "");
  };

  if (loading) return <div className="loading">Laden…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <header className="app-header">
          <div className="logo">LOGO</div>

          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Zoek een locatie"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
          </Autocomplete>

          <button className="hamburger" aria-label="Menu">
            ☰
          </button>
        </header>

        <div className="map-wrapper">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={9}
            onLoad={(map) => (mapRef.current = map)}
          >
            {surfSpots.map((spot) => (
              <Marker
                key={spot.id}
                position={spot.position}
                onClick={() => handleMarkerClick(spot)}
              />
            ))}
          </GoogleMap>
        </div>

        <div className={`bottom-sheet ${selectedSpot ? "show" : ""}`}>
          {selectedSpot && (
            <div className="sheet-content">
              {showMoreInfo ? (
                <MoreInfo
                  spot={selectedSpot}
                  weather={weatherData}
                  onClose={() => setShowMoreInfo(false)}
                />
              ) : (
                <>
                  <h2 className="spot-title">
                    <FontAwesomeIcon icon={faWater} className="title-icon" />{" "}
                    {selectedSpot.name}
                  </h2>

                  {weatherLoading && <p>Laden weergegevens…</p>}
                  {weatherError && <p className="error">{weatherError}</p>}

                  {weatherData && (
                    <div className="quick-stats">
                      <p className="spot-info">
                        <FontAwesomeIcon icon={faThermometerHalf} />{" "}
                        {pick(weatherData.temperature)} °C
                      </p>
                      <p className="spot-info">
                        <FontAwesomeIcon icon={faWind} />{" "}
                        {pick(weatherData.windSpeed)} m/s &nbsp;
                        {pick(weatherData.windDirection)}°
                      </p>
                      {pick(weatherData.waveHeight) && (
                        <p className="spot-info">
                          <FontAwesomeIcon icon={faWaveSquare} />{" "}
                          {pick(weatherData.waveHeight)} m golven
                        </p>
                      )}
                      {selectedSpot.crowd !== "—" && (
                        <p className="spot-info">
                          <FontAwesomeIcon icon={faUsers} /> Crowds:{" "}
                          {selectedSpot.crowd}
                        </p>
                      )}
                      <p className="spot-info description">
                        <FontAwesomeIcon icon={faCloudSun} />{" "}
                        {pick(weatherData.description)}
                      </p>
                      <button
                        className="meerinfo-button"
                        onClick={() => setShowMoreInfo(true)}
                      >
                        Meer info <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  )}

                  <button
                    className="close-button"
                    onClick={handleCloseSheet}
                    aria-label="Sluiten"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </LoadScript>
    </div>
  );
}
