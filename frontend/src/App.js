import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MapWithBottomSheet from './pages/MapWithBottomSheet'; // <-- Deze regel toevoegen

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchmap" element={<MapWithBottomSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
