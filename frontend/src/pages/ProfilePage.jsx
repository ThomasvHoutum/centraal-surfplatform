import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import profilePic from "../assets/images/profile.jpeg";
import zandvoort from "../assets/images/zandvoort.jpg";
import hoekvh from "../assets/images/hoek-van-holland.jpg";
import AddSpotModal from "./AddSpotModal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <div className="profile-page">
        <header className="profile-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            aria-label="Terug"
          >
            ‹
          </button>
          <button
            className="settings-btn"
            aria-label="Instellingen"
            onClick={() => navigate("/account")}
          >
            ⚙︎
          </button>
        </header>

        <section className="profile-info">
          <img src={profilePic} alt="Profielfoto" className="avatar" />
          <h1 className="welcome-title">
            Welkom
            <br />
            Steve Surfy!
          </h1>
        </section>

        <section className="level-section">
          <span className="level-badge">Beginnend windsurfer</span>
          <button
            className="edit-btn"
            onClick={() => navigate("/edit")}
            aria-label="Bewerk tags"
          >
            ✎ Bewerk tags
          </button>
        </section>

        <section className="tags-section">
          <span className="tag blue">Vlak water</span>
          <span className="tag grey">Side-on shore wind</span>
        </section>

        <section className="favorites-section">
          <h2 className="favorites-title">❤ Favoriete spots</h2>
          <div className="favorite-grid">
            <article className="favorite-card">
              <img src={zandvoort} alt="Zandvoort" />
              <h3>Zandvoort</h3>
              <p>Spots</p>
            </article>
            <article className="favorite-card">
              <img src={hoekvh} alt="Hoek van Holland" />
              <h3>Hoek van Holland</h3>
              <p>Spots</p>
            </article>
            <button
              className="add-card"
              onClick={() => setIsAddOpen(true)}
              aria-label="Voeg spot toe"
            >
              ＋
            </button>
            <button
              className="add-card"
              onClick={() => setIsAddOpen(true)}
              aria-label="Voeg spot toe"
            >
              ＋
            </button>
          </div>
        </section>
      </div>

      <AddSpotModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}
