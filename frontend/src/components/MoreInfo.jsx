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
} from "@fortawesome/free-solid-svg-icons";
import "../styles/MoreInfo.css";

const pick = (val) => (Array.isArray(val) ? val[0] : val);

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
        <li>
          <FontAwesomeIcon icon={faThermometerHalf} /> Temp.: {pick(weather.temperature)} °C
        </li>
        <li>
          <FontAwesomeIcon icon={faThermometerHalf} /> Gevoel: {pick(weather.feelsLike)} °C
        </li>
        <li>
          <FontAwesomeIcon icon={faTint} /> Vocht.: {pick(weather.humidity)} %
        </li>
        <li>
          <FontAwesomeIcon icon={faTachometerAlt} /> Druk: {pick(weather.pressure)} hPa
        </li>
        <li>
          <FontAwesomeIcon icon={faWind} /> Wind: {pick(weather.windSpeed)} m/s
        </li>
        <li>
          <FontAwesomeIcon icon={faCompass} /> Richting: {pick(weather.windDirection)}°
        </li>
        {pick(weather.waveHeight) && (
          <li>
            <FontAwesomeIcon icon={faWaveSquare} /> Golven: {pick(weather.waveHeight)} m
          </li>
        )}
        <li className="full-width description">
          <FontAwesomeIcon icon={faCloudSun} /> {pick(weather.description)}
        </li>
      </ul>
    </div>
  );
}
