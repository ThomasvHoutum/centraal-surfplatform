import React, { useState } from 'react';
import { Container, Row, Col, Button, Offcanvas, Nav } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/images/hero.jpg';
import zandvoortImg from '../assets/images/zandvoort.jpg';
import hoekImg from '../assets/images/hoek-van-holland.jpg';
import scheveningenImg from '../assets/images/scheveningen.jpg';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  return (
    <div className="home">
      <div className="hero">
        <button className="hamburger" onClick={handleShow}>
          <FaBars size={24} />
        </button>
        <img src={heroImg} alt="Windsurfer" className="hero-img" />
        <div className="fade" />
        <h1 className="hero-title">WAAR SURF JIJ?</h1>
        <Button className="discover-btn" onClick={() => navigate('/searchmap')}>
          ONTDEK JE SPOT
        </Button>
      </div>

      <Container className="spots-section">
        <h2 className="spots-heading">Populaire Spots</h2>
        <Row className="g-3">
          {[zandvoortImg, hoekImg, scheveningenImg].map((img, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <div className="spot-item d-flex align-items-center">
                <img src={img} alt="" className="spot-thumb" />
                <div className="spot-info ms-3">
                  <div className="spot-name">Naam Spot</div>
                  <div className="spot-sub">Condities</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Offcanvas
        show={showMenu}
        onHide={handleClose}
        placement="start"
        className="custom-offcanvas"
        backdropClassName="custom-backdrop"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => { handleClose(); navigate('/searchmap'); }}>
              Zoeken
            </Nav.Link>
            <Nav.Link onClick={() => { handleClose(); navigate('/auth'); }}>
              Inloggen
            </Nav.Link>
            <Nav.Link onClick={() => { handleClose(); navigate('/auth'); }}>
              Registreren
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
