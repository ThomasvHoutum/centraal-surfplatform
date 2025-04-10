import React from 'react';
import headerBg from '../assets/images/header.jpg';
import '../styles/HeaderSection.css';


const HeaderSection = () => {
    return (
        <div className="header-box mx-auto mt-4">
        <div
          className="header-image d-flex flex-column justify-content-center align-items-center text-center"
          style={{ backgroundImage: `url(${headerBg})` }}
        >
          <div className="text-white">
            <h2 className="fw-light">Jouw</h2>
            <h1 className="fw-bold mb-2">surfdag</h1>
            <h2 className="fw-light mb-4">begint hier</h2>
  
            <div className="d-flex flex-column w-75">
              <button className="btn btn-light rounded-pill mb-2">Probeer zonder account</button>
              <button className="btn btn-light rounded-pill mb-3">Registreren</button>
              <small className="text-white">
                Al een account? <a href="#login" className="text-warning text-decoration-none">Log in</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
};
export default HeaderSection;
