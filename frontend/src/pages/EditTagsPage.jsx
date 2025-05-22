// EditTagsPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditTagsPage.css";

export default function EditTagsPage() {
  const navigate = useNavigate();

  /* ─────────────────── Options ─────────────────── */
  const levelOptions = [
    { id: "Beginner",  color: "green"  },
    { id: "Gemiddeld", color: "orange" },
    { id: "Ervaren",   color: "red"    },
    { id: "Expert",    color: "black"  },
  ];

  const waterOptions = ["Vlak", "Choppy", "Grote golven", "…"];

  const windOptions = [
    { id: "Side-onshore",  warn: false },
    { id: "Side-shore",    warn: false },
    { id: "Onshore",       warn: false },
    { id: "Offshore",      warn: true  },
    { id: "Side-offshore", warn: true  },
  ];

  /* ─────────────────── State ─────────────────── */
  const [level,     setLevel]   = useState("Beginner");
  const [waterSel,  setWater]   = useState(new Set(["Vlak"]));
  const [windSel,   setWind]    = useState(new Set(["Side-onshore"]));

  /* ─────────────────── Helpers ─────────────────── */
  const toggleSet = (key, setter) =>
    setter(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  /* ─────────────────── Render ─────────────────── */
  return (
    <div className="edit-page">
      <header className="edit-header">
        <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
        <h1 className="edit-title">
          Bewerk je<br />voorkeuren
        </h1>
      </header>

      {/* ── Niveau ───────────────────────────────── */}
      <section className="edit-section">
        <h2 className="section-title">Niveau</h2>
        <div className="chip-row">
          {levelOptions.map(({ id, color }) => (
            <button
              key={id}
              className={`chip level-${color} ${level === id ? "active" : ""}`}
              onClick={() => setLevel(id)}
            >
              {level === id && <span className="check">✓</span>}
              {id}
            </button>
          ))}
        </div>
      </section>

      <hr />

      {/* ── Type water ───────────────────────────── */}
      <section className="edit-section">
        <h2 className="section-title">Type water</h2>
        <div className="chip-row">
          {waterOptions.map(opt => (
            <button
              key={opt}
              className={`chip water ${waterSel.has(opt) ? "active" : ""}`}
              onClick={() => toggleSet(opt, setWater)}
            >
              {waterSel.has(opt) && <span className="check">✓</span>}
              {opt}
            </button>
          ))}
        </div>
      </section>

      <hr />

      {/* ── Wind ─────────────────────────────────── */}
      <section className="edit-section">
        <h2 className="section-title">Wind</h2>
        <div className="chip-row">
          {windOptions.map(({ id, warn }) => (
            <button
              key={id}
              className={`chip wind ${windSel.has(id) ? "active" : ""}`}
              onClick={() => toggleSet(id, setWind)}
            >
              {windSel.has(id) && <span className="check">✓</span>}
              {id}
              {warn && <span className="warn">⚠︎</span>}
            </button>
          ))}
        </div>
      </section>

      {/* ── Save ─────────────────────────────────── */}
      <button className="save-btn" onClick={() => navigate("/profile")}>
        Opslaan
      </button>
    </div>
  );
}
