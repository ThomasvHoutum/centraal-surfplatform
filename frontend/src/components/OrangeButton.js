import React from "react";
import "../styles/OrangeButton.css";

export default function OrangeButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-orange w-100 ${className}`}
    >
      {children}
    </button>
  );
}