import React from "react";

const GOOGLE_STATIC_MAPS_KEY = process.env.REACT_APP_GOOGLE_STATIC_MAPS_KEY;

const SurfSpotImage = ({ spot }) => {
  if (!spot || (!spot.latitude && !spot.position?.lat)) return null;

  const lat = spot.latitude || spot.position?.lat;
  const lng = spot.longitude || spot.position?.lng;

  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=satellite&key=${GOOGLE_STATIC_MAPS_KEY}`;

  return (
    <img
      src={imageUrl}
      alt={`Luchtfoto van ${spot.name}`}
      style={{
        width: "100%",
        borderRadius: "1rem",
        objectFit: "cover",
        height: "200px",
      }}
    />
  );
};

export default SurfSpotImage;
