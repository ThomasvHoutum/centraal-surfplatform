import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

import heroImg from '../assets/images/hero.jpg';
import '../styles/Home.css';
import OrangeButton from "../components/OrangeButton";

import FavoriteSpotsLanding from '../components/FavoriteSpotsLanding';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Home() {
  const navigate = useNavigate();
  const [favoriteSpots, setFavoriteSpots] = useState([]);

  useEffect(() => {
    async function fetchFavoriteSpots() {
      const spotIds = [4, 27, 47];

      try {
        const spotRequests = spotIds.map((id) =>
          axios.get(`${API_BASE_URL}/SurfSpot/${id}`)
        );
        const spotResponses = await Promise.all(spotRequests);

        const enrichedSpots = await Promise.all(
          spotResponses.map(async (res) => {
            const spot = res.data;

            const weatherRes = await axios.get(`${API_BASE_URL}/Weather`, {
              params: {
                latitude: spot.latitude,
                longitude: spot.longitude,
              },
            });

            return {
              ...spot,
              weather: weatherRes.data,
            };
          })
        );

        setFavoriteSpots(enrichedSpots);
      } catch (err) {
        console.error("Fout bij ophalen van populaire spots:", err);
      }
    }

    fetchFavoriteSpots();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <button className="hamburger">
          <FaBars size={24} />
        </button>

        <img src={heroImg} alt="Windsurfer" className="hero-img" />
        <div className="fade" />
        <h1 className="hero-title">WAAR SURF JIJ?</h1>
      </div>
      <OrangeButton className="discover-btn" onClick={() => navigate("/searchmap")}>
                ONTDEK JE SPOT
              </OrangeButton>

      <FavoriteSpotsLanding spots={favoriteSpots} />
    </div>
  );
}
