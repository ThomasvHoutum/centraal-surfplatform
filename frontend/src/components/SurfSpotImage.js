import React from "react";

const GOOGLE_STATIC_MAPS_KEY = process.env.REACT_APP_GOOGLE_STATIC_MAPS_KEY;

const SurfSpotImage = ({ spot }) => {
if (!spot || !spot.position) return null;

  const { name, position } = spot;
  const { lat, lng } = position;

  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=satellite&key=${GOOGLE_STATIC_MAPS_KEY}`;
  console.log("MAP IMAGE URL:", imageUrl);
  return (
    <img
      src={imageUrl}
      alt={`Luchtfoto van ${name}`}
      style={{ width: "100%", borderRadius: "1rem", objectFit: "cover", height: "200px" }}
    />
  );
};

export default SurfSpotImage;
