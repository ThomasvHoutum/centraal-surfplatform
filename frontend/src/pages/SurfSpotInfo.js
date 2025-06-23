import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SurfSpotImage from "../components/SurfSpotImage";
import MoreInfoSheet from "../components/MoreInfoSheet";
import OrangeButton from "../components/OrangeButton";
import SpotTitle from "../components/SpotTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faWind,
  faWater,
  faUsers,
  faCloudSun,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function SurfSpotInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [spot, setSpot] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const spotResp = await axios.get(`${API_BASE_URL}/SurfSpot/${id}`);
      setSpot({
        ...spotResp.data,
        position: {
          lat: spotResp.data.latitude,
          lng: spotResp.data.longitude,
        },
      });

      const weatherResp = await axios.get(`${API_BASE_URL}/Weather`, {
        params: {
          latitude: spotResp.data.latitude,
          longitude: spotResp.data.longitude,
        },
      });
      setWeather(weatherResp.data);
    }

    fetchData();
  }, [id]);

  const pick = (val) => (Array.isArray(val) ? val[0] : val);

  if (!spot || !weather) return <div className="p-3">Laden...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: "430px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} /> Terug
        </button>
        <strong>LOGO</strong>
      </div>

      {/* Afbeelding */}
      <div className="mb-3 rounded overflow-hidden">
        <SurfSpotImage spot={spot} />
      </div>

      <SpotTitle title={spot.name} />

      {/* Kerngegevens */}
      <ul className="list-unstyled fs-6 mb-4">
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

      <OrangeButton onClick={() => setShowMoreInfo(true)}>
        Meer info
      </OrangeButton>


      {/* Bottom sheet */}
      {showMoreInfo && (
        <MoreInfoSheet
          spot={spot}
          weather={weather}
          onClose={() => setShowMoreInfo(false)}
        />
      )}
    </div>
  );
}
