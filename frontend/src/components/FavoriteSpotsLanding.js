import React from "react";
import { useNavigate } from "react-router-dom";
import SurfSpotImage from "./SurfSpotImage";
import HeadTitle from "../components/HeadTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faThermometerHalf, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteSpotsLanding({ spots }) {
  const navigate = useNavigate();

  if (!spots || spots.length === 0) {
    return <div className="px-3 py-4 text-muted">Spots laden...</div>;
  }

  return (
    <section className="favorite-spots px-3 pt-1">
      <HeadTitle title="Populaire Spots" icon={faHeart} />

      {spots.map((spot) => (
        <div
          key={spot.id}
          className="spot-card mb-3"
          onClick={() => navigate(`/spot/${spot.id}`)}
        >
          <div className="spot-image-wrapper">
              <SurfSpotImage spot={spot} />
            </div>

            <div className="d-flex flex-column justify-content-center">
              <div className="spot-title">{spot.name}</div>
              <div className="spot-weather d-flex align-items-center gap-3">
                <span>
                  <FontAwesomeIcon icon={faThermometerHalf} className="me-1" style={{ color: "#f4a300" }} />
                  {Array.isArray(spot.weather?.temperature)
                    ? spot.weather.temperature[0]
                    : spot.weather?.temperature}{" "}
                  °C
                </span>
                <span>
                  <FontAwesomeIcon icon={faWind} className="me-1" style={{ color: "#6c757d" }} />
                  {Array.isArray(spot.weather?.windSpeed)
                    ? spot.weather.windSpeed[0]
                    : spot.weather?.windSpeed}{" "}
                  m/s
                </span>
              </div>
            </div>
          </div>
      ))}
    </section>
  );
}
