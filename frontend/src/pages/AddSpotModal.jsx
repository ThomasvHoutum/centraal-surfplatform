// AddSpotModal.js
import React, { useState } from "react";
import "./AddSpotModal.css";

export default function AddSpotModal({ isOpen, onClose }) {
  const levelOptions = [
    { id: "Beginner", color: "green" },
    { id: "Gemiddeld", color: "orange" },
    { id: "Ervaren", color: "red" },
    { id: "Expert", color: "black" },
  ];

  const waterOptions = ["Vlak", "Choppy", "Grote golven"];

  const windDirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  const [spotName, setSpotName] = useState("");
  const [locMode, setLocMode] = useState("map");
  const [levelSel, setLevelSel] = useState(new Set(["Beginner"]));
  const [waterSel, setWaterSel] = useState(new Set(["Vlak"]));
  const [windDir, setWindDir] = useState("NW");
  const [remark, setRemark] = useState("");

  const toggleSet = (key, setter) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div
      className={`spot-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        className="spot-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Sluiten">
          ×
        </button>
        <h2 className="modal-title">Spot toevoegen</h2>

        <label className="modal-label" htmlFor="spot-name">
          Naam spot
        </label>
        <input
          id="spot-name"
          type="text"
          className="modal-input"
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
        />

        <label className="modal-label">Locatie</label>
        <div className="loc-row">
          <button
            className={`loc-btn ${locMode === "map" ? "active" : ""}`}
            onClick={() => setLocMode("map")}
          >
            Pin op kaart
          </button>
          <button
            className={`loc-btn ${locMode === "address" ? "active" : ""}`}
            onClick={() => setLocMode("address")}
          >
            Adres
          </button>
        </div>

        <label className="modal-label">Niveau</label>
        <div className="chip-row">
          {levelOptions.map(({ id, color }) => (
            <button
              key={id}
              className={`chip level-${color} ${
                levelSel.has(id) ? "active" : ""
              }`}
              onClick={() => toggleSet(id, setLevelSel)}
            >
              {levelSel.has(id) && <span className="check">✓</span>}
              {id}
            </button>
          ))}
        </div>

        <label className="modal-label">Type water</label>
        <div className="chip-row">
          {waterOptions.map((t) => (
            <button
              key={t}
              className={`chip water ${waterSel.has(t) ? "active" : ""}`}
              onClick={() => toggleSet(t, setWaterSel)}
            >
              {waterSel.has(t) && <span className="check">✓</span>}
              {t}
            </button>
          ))}
        </div>

        <label className="modal-label" htmlFor="wind-dir">
          Voorkeur wind
        </label>
        <select
          id="wind-dir"
          className="modal-select"
          value={windDir}
          onChange={(e) => setWindDir(e.target.value)}
        >
          {windDirs.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <label className="modal-label" htmlFor="remark">
          Voeg opmerking toe
        </label>
        <input
          id="remark"
          type="text"
          className="modal-input"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />

        <button className="btn btn-primary modal-submit">Voeg toe</button>
      </div>
    </div>
  );
}
