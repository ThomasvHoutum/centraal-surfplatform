import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`login-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Sluiten">
          ×
        </button>
        <h2 className="modal-title">Inloggen</h2>
        <label className="modal-label" htmlFor="email">
          E-mail
        </label>
        <input id="email" type="email" className="modal-input" />
        <div className="password-row">
          <label className="modal-label" htmlFor="password">
            Wachtwoord
          </label>
          <button
            type="button"
            className="eye-toggle"
            aria-label="Toon wachtwoord"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg
              className="eye-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="modal-input"
        />
        <button
          className="btn btn-primary modal-submit"
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
        >
          Inloggen
        </button>
        <button className="forgot-btn">Wachtwoord vergeten?</button>
      </div>
    </div>
  );
}
