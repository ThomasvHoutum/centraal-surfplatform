import React from "react";

const GOOGLE_STATIC_MAPS_KEY = process.env.REACT_APP_GOOGLE_STATIC_MAPS_KEY;

const SurfSpotImage = ({ spot }) => {
  if (!spot || (!spot.latitude && !spot.position?.lat)) return null;

  const lat = spot.latitude || spot.position?.lat;
  const lng = spot.longitude || spot.position?.lng;

  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:0xff69b4|${spot.latitude},${spot.longitude}&key=${GOOGLE_STATIC_MAPS_KEY}`;

  return (
    <div
      style={{
        border: "3px solid #ccd6f6",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      <img
        src={imageUrl}
        alt={`Luchtfoto van ${spot.name}`}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};

export default SurfSpotImage;