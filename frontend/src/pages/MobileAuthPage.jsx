import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileAuthPage.css";
import mapHeader from "../assets/images/map-header.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function MobileAuthPage() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="auth-page">
        <header className="map-header">
          <button className="back-btn" aria-label="Terug" onClick={() => navigate(-1)}>
            ‹
          </button>
          <img src={mapHeader} alt="Kaart van de Grevelingen-archipel" />
        </header>
        <main className="auth-content">
          <h1 className="auth-title">
            Vang de wind,<br />op&nbsp;jouw plek!
          </h1>
          <p className="auth-description">
            Met een account kun je windsurfspots toevoegen, je favorieten
            bewaren en slimme aanbevelingen krijgen op basis van jouw surfstijl
            en condities.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setIsRegisterOpen(true)}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="9"
                cy="7"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M2 21c.7-4 3.7-6 7-6s6.3 2 7 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 9v6m-3-3h6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Account aanmaken
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsLoginOpen(true)}
          >
            Inloggen
          </button>
        </main>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
