import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderBar from "../components/HeaderBar";
import SurfSpotImage from "../components/SurfSpotImage";
import HeadTitle from "../components/HeadTitle";
import SpotDetailList from "../components/SpotDetailList";
import OrangeButton from "../components/OrangeButton";
import MoreInfoSheet from "../components/MoreInfoSheet";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function SurfSpotInfo() {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const spotResp = await axios.get(`${API_BASE_URL}/SurfSpot/${id}`);
        setSpot(spotResp.data);

        const weatherResp = await axios.get(`${API_BASE_URL}/Weather`, {
          params: {
            latitude: spotResp.data.latitude,
            longitude: spotResp.data.longitude,
          },
        });
        setWeather(weatherResp.data);
      } catch (err) {
        console.error("Fout bij laden:", err);
      }
    }

    fetchData();
  }, [id]);

  if (!spot || !weather) return <div className="p-3">Laden...</div>;

  return (
    <div
      className="container d-flex flex-column min-vh-100 py-4"
      style={{ maxWidth: "430px", position: "relative", margin: "0 auto" }}
    >
      <HeaderBar title="LOGO" />

      <div className="mb-3 rounded overflow-hidden">
        <SurfSpotImage spot={spot} />
      </div>

      <HeadTitle title={spot.name} icon={faWater} />
      <SpotDetailList spot={spot} weather={weather} />

      <div className="mt-4">
        <HeadTitle title="Voorzieningen" icon={faToolbox} />
        <div className="mb-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Bijv. Toiletten aanwezig"
            disabled
          />
          <input
            type="text"
            className="form-control"
            placeholder="Bijv. Douches aanwezig"
            disabled
          />
        </div>
      </div>

      {showMoreInfo && (
        <MoreInfoSheet
          spot={spot}
          weather={weather}
          onClose={() => setShowMoreInfo(false)}
        />
      )}

      {!showMoreInfo && (
        <div className="mt-auto">
          <OrangeButton onClick={() => setShowMoreInfo(true)}>
            Meer info
          </OrangeButton>
        </div>
      )}
    </div>
  );
}