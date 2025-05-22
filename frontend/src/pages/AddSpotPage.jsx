// pages/AddSpotPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddSpotModal from './AddSpotModal.jsx';

export default function AddSpotPage() {
  const navigate = useNavigate();
  return (
    <AddSpotModal
      isOpen={true}
      onClose={() => navigate(-1)}
    />
  );
}
