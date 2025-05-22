// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MapWithBottomSheet from './pages/MapWithBottomSheet';
import MobileAuthPage from './pages/MobileAuthPage';
import ProfilePage from './pages/ProfilePage';
import EditTagsPage from './pages/EditTagsPage';
import AddSpotPage from './pages/AddSpotPage'; 
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchmap" element={<MapWithBottomSheet />} />
        <Route path="/auth" element={<MobileAuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditTagsPage />} />
        <Route path="/add-spot" element={<AddSpotPage />} /> 
        <Route path="/account" element={<AccountPage />} />

      </Routes>
    </Router>
  );
}

export default App;
