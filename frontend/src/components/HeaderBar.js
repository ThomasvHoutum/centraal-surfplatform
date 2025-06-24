import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const HeaderBar = ({ showBackButton = true, title = "LOGO" }) => {
  const navigate = useNavigate();

  return (
    <Navbar style={{ backgroundColor: "#F6F4F4" }} className="mb-3">
      <Container className="justify-content-between align-items-center">
        <div>
          {showBackButton && (
            <button className="btn btn-black btn-sm" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" /></button>
          )}
        </div>
        <div className="text-center mx-auto fw-bold text-dark">{title}</div>
        <div style={{ width: "60px" }}></div>
      </Container>
    </Navbar>
  );
};

export default HeaderBar;
