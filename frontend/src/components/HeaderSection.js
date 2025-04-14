import React from 'react';
import headerBg from '../assets/images/header.jpg';
import '../styles/HeaderSection.css';


const HeaderSection = () => {
  return (
    <div className="header-box mx-auto mt-4">
      <div
        className="header-image d-flex flex-column justify-content-between align-items-center text-center px-4 py-5"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      >
        <div className="text-white pt-3">
          <h2 className="fw-light display-6">Jouw</h2>
          <h1 className="fw-bold display-3 mb-2">surfdag</h1>
          <h2 className="fw-light display-6 mb-2">begint hier</h2>
        </div>

        <div className="w-100 d-flex justify-content-center px-4 my-3">
          <div className="w-100">
            <input
              type="text"
              className="form-control text-center shadow px-4 py-3"
              placeholder="Waar ga jij vandaag surfen?"
            />
          </div>
        </div>

        <div className="d-flex flex-column align-items-center text-white w-100 mb-4 px-4">
          <button className="btn btn-secondary shadow mb-3 w-100 py-2 px-4 fs-5 border-0">
            Probeer zonder account
          </button>
          <button className="btn btn-secondary shadow mb-3 w-100 py-2 px-4 fs-5 border-0">
            Registreren
          </button>

          <div className="mt-2 text-center">
            <small className="d-block">Al een account?</small>
            <small>
              <a href="#login" className="text-warning text-decoration-none">Log in</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

        export default HeaderSection;