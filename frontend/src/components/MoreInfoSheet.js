import React from "react";
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
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: "430px",
      margin: "0 auto",
      backgroundColor: "#fff",
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem",
      padding: "1.5rem",
      boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)",
      zIndex: 9999,
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <h2 style={{ color: "#0056b3" }}>
          <FontAwesomeIcon icon={faCloudSun} /> Meer info – {spot.name}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Info grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem 1rem",
        fontSize: "0.95rem"
      }}>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Coörd.: {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}</p>
        <p><FontAwesomeIcon icon={faClock} /> Tijd: {pick(weather.timestamp)}</p>

        <p><FontAwesomeIcon icon={faThermometerHalf} /> Temp.: {pick(weather.temperature)} °C</p>
        <p><FontAwesomeIcon icon={faWind} /> Wind: {pick(weather.windSpeed)} m/s</p>

        <p><FontAwesomeIcon icon={faCompass} /> Richting: {pick(weather.windDirection)}°</p>
        <p><FontAwesomeIcon icon={faWaveSquare} /> Golfhoogte: {pick(weather.waveHeight)} m</p>

        <p><FontAwesomeIcon icon={faArrowsAltH} /> Golfperiode: {pick(weather.wavePeriod)} s</p>
        <p><FontAwesomeIcon icon={faCompass} /> Golfrichting: {pick(weather.waveDirection)}°</p>

        <p><FontAwesomeIcon icon={faWater} /> Watertemp.: {pick(weather.waterTemperature)} °C</p>
      </div>
    </div>
  );
}