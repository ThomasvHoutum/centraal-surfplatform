import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import AppNavbar from '../components/Navbar';
import HeaderSection from '../components/HeaderSection';

const Home = () => {
  return (
   <>
   <AppNavbar />
    <div className="d-flex justify-content-center">
        <HeaderSection />
        </div>
   </>
  );
};

export default Home;
