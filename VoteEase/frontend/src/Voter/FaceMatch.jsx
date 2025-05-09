// components/FaceMatch.js
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button, Typography } from "@mui/material";

export default function FaceMatch({ onMatchSuccess }) {
  const webcamRef = useRef(null);
  const [webcamImage, setWebcamImage] = useState(null);
  const [webcamPreview, setWebcamPreview] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [result, setResult] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "live.jpg", { type: "image/jpeg" });
          setWebcamImage(file);
          setWebcamPreview(imageSrc);
        });
    }
  }, []);

  const handleCompare = async () => {
    if (!webcamImage || !uploadImage) {
      alert("Please provide both images.");
      return;
    }

    const formData = new FormData();
    formData.append("image1", webcamImage);
    formData.append("image2", uploadImage);

    try {
      const res = await fetch("http://127.0.0.1:3000/compare", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.result === "faces_match") {
        setResult("Match Found ✅");
        onMatchSuccess(uploadImage); // Notify parent with the image
      } else {
        setResult("No Match ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      setResult("Comparison failed.");
    }
  };

  return (
    <div>
      <Typography variant="h6">Live Face Verification</Typography>

      {/* Webcam */}
      <Webcam ref={webcamRef} width={320} height={240} screenshotFormat="image/jpeg" />
      <Button onClick={capture}>Take Snapshot</Button>
      {webcamPreview && <img src={webcamPreview} alt="Captured" width="200" />}

      {/* Upload Image */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setUploadImage(e.target.files[0])}
      />

      <Button onClick={handleCompare}>Compare</Button>
      <Typography>{result}</Typography>
    </div>
  );
}
