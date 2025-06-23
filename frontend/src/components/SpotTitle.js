import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import "../styles/SpotTitle.css";

export default function SpotTitle({ title }) {
  return (
    <h2 className="spot-title d-flex align-items-center fs-4 mb-3">
      <FontAwesomeIcon icon={faWater} className="me-2" />
      {title}
    </h2>
  );
}
