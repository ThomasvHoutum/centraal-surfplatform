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
        <HeadTitle title={`Meer info – ${spot.name}`} icon={faCloudSun} />
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <ul className="weather-details">
        <li>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Coörd.: {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
        </li>
        <li>
          <FontAwesomeIcon icon={faClock} /> Tijd: {pick(weather.timestamp)}
        </li>
        <li>
          <FontAwesomeIcon icon={faThermometerHalf} /> Temp.: {pick(weather.temperature)} °C
        </li>
        <li>
          <FontAwesomeIcon icon={faWind} /> Wind: {pick(weather.windSpeed)} m/s
        </li>
        <li>
          <FontAwesomeIcon icon={faCompass} /> Richting: {pick(weather.windDirection)}°
        </li>
        <li>
          <FontAwesomeIcon icon={faWaveSquare} /> Golfhoogte: {pick(weather.waveHeight)} m
        </li>
        <li>
          <FontAwesomeIcon icon={faArrowsAltH} /> Golfperiode: {pick(weather.wavePeriod)} s
        </li>
        <li>
          <FontAwesomeIcon icon={faCompass} /> Golfrichting: {pick(weather.waveDirection)}°
        </li>
        <li className="full-width">
          <FontAwesomeIcon icon={faWater} /> Watertemp.: {pick(weather.waterTemperature)} °C
        </li>
      </ul>
    </div>
  );
}
