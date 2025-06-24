import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/SurfSpotDetailList.css";
import {
  faThermometerHalf,
  faWind,
  faWater,
  faUsers,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";

export default function SpotDetailList({ weather, spot }) {
  const pick = (val) => (Array.isArray(val) ? val[0] : val);

  return (
    <ul className="detail-list fs-6 mb-4">
      <li className="detail-item">
        <span className="icon">
          <FontAwesomeIcon icon={faThermometerHalf} />
        </span>
        <span className="text">Temperatuur: {pick(weather.temperature)} °C</span>
      </li>
      <li className="detail-item">
        <span className="icon">
          <FontAwesomeIcon icon={faWind} />
        </span>
        <span className="text">
          Wind: {pick(weather.windSpeed)} m/s, {pick(weather.windDirection)}°
        </span>
      </li>
      {pick(weather.waveHeight) && (
        <li className="detail-item">
          <span className="icon">
            <FontAwesomeIcon icon={faWater} />
          </span>
          <span className="text">Golven: {pick(weather.waveHeight)} m</span>
        </li>
      )}
      {spot.crowd && (
        <li className="detail-item">
          <span className="icon">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <span className="text">Crowd: {spot.crowd}</span>
        </li>
      )}
      <li className="detail-item">
        <span className="icon">
          <FontAwesomeIcon icon={faCloudSun} />
        </span>
        <span className="text">{pick(weather.description)}</span>
      </li>
    </ul>
  );
}