import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/images/hero.jpg';
import zandvoortImg from '../assets/images/zandvoort.jpg';
import hoekImg from '../assets/images/hoek-van-holland.jpg';
import scheveningenImg from '../assets/images/scheveningen.jpg';
import Button from '../components/Button';
import './Landing.css';

const spots = [
  { name: 'Zandvoort', img: zandvoortImg, subtitle: 'Condities' },
  { name: 'Hoek van Holland', img: hoekImg, subtitle: 'Condities' },
  { name: 'Scheveningen', img: scheveningenImg, subtitle: 'Condities' },
];

  export default function Landing() {
    const navigate = useNavigate();

    return (
      <div className="landing">
        <div className="hero">
          <button className="hamburger">
            <FaBars size={24} />
          </button>

          <img src={heroImg} alt="Windsurfer" className="hero-img" />
          <div className="fade" />
          <h1 className="hero-title">WAAR SURF JIJ?</h1>
        </div>

        <Button
          variant="hero"
          className="landing-btn"
          onClick={() => navigate('/searchmap')}
        >
          ONTDEK JE SPOT
        </Button>

        <Container className="spots-section">
          <h2 className="spots-heading">Populaire Spots</h2>
          <Row className="g-3">
            {spots.map((spot) => (
              <Col key={spot.name} xs={12} sm={6} md={4}>
                <div className="spot-item d-flex align-items-center">
                  <img
                    src={spot.img}
                    alt={spot.name}
                    className="spot-thumb"
                  />
                  <div className="spot-info ms-3">
                    <div className="spot-name">{spot.name}</div>
                    <div className="spot-sub">{spot.subtitle}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }