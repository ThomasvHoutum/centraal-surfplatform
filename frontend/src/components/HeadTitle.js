import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/HeadTitle.css";

export default function HeadTitle({ title, icon = null }) {
  return (
    <h2 className="head-title d-flex align-items-center mb-3">
      {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
      {title}
    </h2>
  );
}
