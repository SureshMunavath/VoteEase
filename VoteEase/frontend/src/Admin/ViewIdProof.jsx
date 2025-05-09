import React from "react";
import { useLocation } from "react-router-dom";

export default function ViewIdProof() {
  const location = useLocation();
  const { imageUrl } = location.state || {}; // Destructure the state object

  if (!imageUrl) {
    return <h2>No image URL provided.</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Enlarged Photo</h1>
      <img
        src={imageUrl}
        alt="Enlarged ID Proof"
        style={{
          maxWidth: "90%",
          maxHeight: "80vh",
          border: "2px solid black",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}
