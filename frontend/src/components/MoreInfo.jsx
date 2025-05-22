import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faTint,
  faTachometerAlt,
  faCompass,
  faWind,
  faCloudSun,
  faTimes,
  faWaveSquare,
  faWater,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/MoreInfo.css";

// Helper to safely pick the first element if the API returns an array
const pick = (val) => (Array.isArray(val) ? val[0] : val);

/**
 * Shows a full weather read‑out for a surf spot.
 * All properties coming back from the WeatherService are rendered, so if the
 * backend adds more data you only need to add another <li> here.
 */
export default function MoreInfo({ spot, weather, onClose }) {
  if (!weather) return null;

  return (
    <div className="moreinfo-container">
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Terug naar samenvatting"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <h2 className="moreinfo-title">
        <FontAwesomeIcon icon={faCloudSun} className="title-icon" /> Meer info – {spot.name}
      </h2>

      <ul className="weather-details">
        {/* Coordinates + timestamp */}
        <li>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Coord.: {pick(weather.latitude)}, {pick(weather.longitude)}
        </li>
        {pick(weather.time) && (
          <li>
            <FontAwesomeIcon icon={faClock} /> Tijd: {new Date(pick(weather.time)).toLocaleString()}
          </li>
        )}

        {/* Atmospheric */}
        <li>
          <FontAwesomeIcon icon={faThermometerHalf} /> Temp.: {pick(weather.temperature)} °C
        </li>
        {pick(weather.feelsLike) && (
          <li>
            <FontAwesomeIcon icon={faThermometerHalf} /> Gevoel: {pick(weather.feelsLike)} °C
          </li>
        )}
        {pick(weather.humidity) && (
          <li>
            <FontAwesomeIcon icon={faTint} /> Vocht.: {pick(weather.humidity)} %
          </li>
        )}
        {pick(weather.pressure) && (
          <li>
            <FontAwesomeIcon icon={faTachometerAlt} /> Druk: {pick(weather.pressure)} hPa
          </li>
        )}

        {/* Wind */}
        <li>
          <FontAwesomeIcon icon={faWind} /> Wind: {pick(weather.windSpeed)} m/s
        </li>
        <li>
          <FontAwesomeIcon icon={faCompass} /> Richting: {pick(weather.windDirection)}°
        </li>

        {/* Waves & water */}
        {pick(weather.waveHeight) && (
          <li>
            <FontAwesomeIcon icon={faWaveSquare} /> Golfhoogte: {pick(weather.waveHeight)} m
          </li>
        )}
        {pick(weather.wavePeriod) && (
          <li>
            <FontAwesomeIcon icon={faWaveSquare} /> Golfperiode: {pick(weather.wavePeriod)} s
          </li>
        )}
        {pick(weather.waveDirection) && (
          <li>
            <FontAwesomeIcon icon={faCompass} /> Golfrichting: {pick(weather.waveDirection)}°
          </li>
        )}
        {pick(weather.waterTemperature) && (
          <li>
            <FontAwesomeIcon icon={faWater} /> Watertemp.: {pick(weather.waterTemperature)} °C
          </li>
        )}

        {/* General description */}
        {pick(weather.description) && (
          <li className="full-width description">
            <FontAwesomeIcon icon={faCloudSun} /> {pick(weather.description)}
          </li>
        )}
      </ul>
    </div>
  );
}
