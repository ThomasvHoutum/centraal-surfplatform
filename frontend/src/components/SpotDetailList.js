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
    <ul className="list-unstyled detail-list fs-6 mb-4">
      <li className="mb-2">
        <FontAwesomeIcon icon={faThermometerHalf} className="me-2" style={{ fontSize: "1.2rem" }} />
        Temperatuur: {pick(weather.temperature)} °C
      </li>
      <li className="mb-2">
        <FontAwesomeIcon icon={faWind} className="me-2" style={{ fontSize: "1.2rem" }} />
        Wind: {pick(weather.windSpeed)} m/s, {pick(weather.windDirection)}°
      </li>
      {pick(weather.waveHeight) && (
        <li className="mb-2">
          <FontAwesomeIcon icon={faWater} className="me-2" style={{ fontSize: "1.2rem" }} />
          Golven: {pick(weather.waveHeight)} m
        </li>
      )}
      {spot.crowd && (
        <li className="mb-2">
          <FontAwesomeIcon icon={faUsers} className="me-2" style={{ fontSize: "1.2rem" }} />
          Crowd: {spot.crowd}
        </li>
      )}
      <li className="mb-2">
        <FontAwesomeIcon icon={faCloudSun} className="me-2" style={{ fontSize: "1.2rem" }} />
        {pick(weather.description)}
      </li>
    </ul>
  );
}