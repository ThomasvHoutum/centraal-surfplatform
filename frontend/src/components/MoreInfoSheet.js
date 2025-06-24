import React from "react";
import "../styles/MoreInfoSheet.css";
import HeadTitle from "./HeadTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCloudSun,
  faClock,
  faMapMarkerAlt,
  faThermometerHalf,
  faWind,
  faWater,
  faWaveSquare,
  faArrowsAltH,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

export default function MoreInfoSheet({ spot, weather, onClose }) {
  const pick = (val) => (Array.isArray(val) ? val[0] : val);

  return (
    <div className="moreinfo-sheet">
      <div className="moreinfo-header">
        <HeadTitle title={`Meer info –\n${spot.name}`} icon={faCloudSun} />
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

       <ul className="weather-details">
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="coord-icon" />
            </span>
            Coörd.: {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faClock} className="time-icon" />
            </span>
            Tijd: {pick(weather.timestamp)}
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faThermometerHalf} className="temp-icon" />
            </span>
            Temp.: {pick(weather.temperature)} °C
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faWind} className="wind-icon" />
            </span>
            Wind: {pick(weather.windSpeed)} m/s
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faCompass} className="wind-icon" />
            </span>
            Richting: {pick(weather.windDirection)}°
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faWaveSquare} className="wave-icon" />
            </span>
            Golfhoogte: {pick(weather.waveHeight)} m
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faArrowsAltH} className="wave-icon" />
            </span>
            Golfperiode: {pick(weather.wavePeriod)} s
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faCompass} className="wave-icon" />
            </span>
            Golfrichting: {pick(weather.waveDirection)}°
          </li>
          <li>
            <span className="icon-col">
              <FontAwesomeIcon icon={faWater} className="wave-icon" />
            </span>
            Watertemp.: {pick(weather.waterTemperature)} °C
          </li>
        </ul>
    </div>
  );
}
