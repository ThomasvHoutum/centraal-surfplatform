import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Welkom bij het Centraal Surfplatform</h1>
        <p className="lead text-muted">
          Ontdek de beste surfspots, deel ervaringen en blijf op de hoogte van de laatste golven.
        </p>
        <FontAwesomeIcon icon={faWaveSquare} size="3x" className="text-primary mt-3" />
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Surfspot overzicht</h5>
              <p className="card-text">
                Bekijk en ontdek surfspots over heel Nederland, beoordeeld door de community.
              </p>
              <a href="#spots" className="btn btn-primary">
                Bekijk spots <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Word lid van de community</h5>
              <p className="card-text">
                Registreer je gratis en deel je ervaringen met andere surfers.
              </p>
              <a href="#register" className="btn btn-outline-primary">
                Registreer nu <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
