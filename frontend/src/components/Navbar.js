import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ showBackButton = true, title = "LOGO" }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" className="mb-3">
      <Container className="justify-content-between align-items-center">
        <div>
          {showBackButton && (
            <button className="btn btn-light btn-sm" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} /> Terug
            </button>
          )}
        </div>

        <div className="text-center mx-auto fw-bold text-primary">{title}</div>

        <div style={{ width: "60px" }}></div>
      </Container>
    </Navbar>
  );
};

export default Navbar;
