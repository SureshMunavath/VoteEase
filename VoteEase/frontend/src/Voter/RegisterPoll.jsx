
import React, { useState, useRef, useCallback, useContext } from "react";
import Webcam from "react-webcam";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { UserContext } from "../UserContext";

export default function RegisterPoll() {
  const { userInfo } = useContext(UserContext);
  const webcamRef = useRef(null);
  const [voterid, setVoterid] = useState("");
  const [idProof, setIdProof] = useState(null);
  const [webcamImage, setWebcamImage] = useState(null);
  const [webcamImagePreview, setWebcamImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadMessage, setUploadMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [comparisonResult, setComparisonResult] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [idProofUrl, setIdProofUrl] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);

  const showMessageFor5Seconds = (setterFunction, message) => {
    setterFunction(message);
    setTimeout(() => setterFunction(""), 5000);
  };

  const handleFileChange = (e) => {
    setIdProof(e.target.files[0]);
    setErrors((prev) => ({ ...prev, idProof: "" }));
  };

  const captureWebcamImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "webcam-image.jpg", {
            type: "image/jpeg",
          });
          setWebcamImage(file);
          setWebcamImagePreview(imageSrc);
          setShowWebcam(false);
        });
    }
  }, []);

  const handleCompare = async () => {
    if (!idProof || !webcamImage) {
      setComparisonResult("Please upload your ID proof and capture a live image.");
      return;
    }

    setIsComparing(true);
    const formData = new FormData();
    formData.append("image1", webcamImage);
    formData.append("image2", idProof);
    console.log(formData);

    try {
      const response = await fetch("http://127.0.0.1:3000/compare", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.result === "faces_match") {
        setComparisonResult("Face match successful.");
        await uploadIdProofToCloudinary();
      } else {
        setComparisonResult("Face match failed. Please try again.");
      }
    } catch (err) {
      setComparisonResult("Error during comparison. Try again.");
    } finally {
      setIsComparing(false);
    }
  };

  const uploadIdProofToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append("file", idProof);
      formData.append("upload_preset", "Registered_voters");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dw4reriae/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      setIdProofUrl(data.secure_url);
      showMessageFor5Seconds(setUploadMessage, "ID proof uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      showMessageFor5Seconds(setUploadMessage, "Failed to upload ID proof.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const aadharRegex = /^\d{12}$/;
    // if (!aadharRegex.test(aadharNumber)) {
    //   setErrors({ aadharNumber: "Aadhaar number must be a 12-digit numeric value." });
    //   return;
    // }

    const voterIdRegex = /^[A-Z]{3}\d{7}$/;

    if (!voterIdRegex.test(voterid)) {
      setErrors({ voterIdNumber: "Voter ID must be in the format ABC1234567 (3 capital letters followed by 7 digits)." });
      return;
    }


    if (!idProofUrl) {
      setErrors({ general: "Please complete the image verification first." });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/voter/register_poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterid, idProofUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.error || "Something went wrong." });
      } else {
        setSuccessMessage("Registration for the poll completed!");
        setVoterid("");
        setIdProof(null);
        setWebcamImage(null);
        setWebcamImagePreview(null);
        setIdProofUrl("");
        setErrors({});
      }
    } catch (err) {
      setErrors({ general: "Error while registering. Try again later." });
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Poll Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              {/* Aadhaar Number */}
              <TextField
                label="Voter ID Number"
                variant="outlined"
                value={voterid}
                onChange={(e) => setVoterid(e.target.value)}
                required
                error={!!errors.voterid}
                helperText={errors.voterid}
              />

              {/* Upload ID Proof */}
              <Button variant="contained" component="label">
                Upload ID Proof (JPG only)
                <input type="file" accept=".jpg,.jpeg" hidden onChange={handleFileChange} />
              </Button>
              {idProof && (
                <Typography variant="body2">Selected File: {idProof.name}</Typography>
              )}

              {/* Capture Webcam Image */}
              {!webcamImagePreview && !showWebcam && (
                <Button onClick={() => setShowWebcam(true)}>Capture Live Image</Button>
              )}

              {showWebcam && (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    height={240}
                  />
                  <Button onClick={captureWebcamImage}>Take Snapshot</Button>
                </>
              )}

              {webcamImagePreview && (
                <Box>
                  <Typography>Captured Image Preview:</Typography>
                  <img src={webcamImagePreview} alt="Captured" width="200" />
                  <Button
                    onClick={() => {
                      setWebcamImagePreview(null);
                      setWebcamImage(null);
                      setShowWebcam(false);
                    }}
                  >
                    Retake Image
                  </Button>
                </Box>
              )}

              {/* Compare Button */}
              <Button variant="outlined" onClick={handleCompare} disabled={isComparing}>
                {isComparing ? <CircularProgress size={20} /> : "Verify Face Match"}
              </Button>
              {comparisonResult && (
                <Typography
                  style={{
                    color: comparisonResult.includes("successful") ? "green" : "red",
                  }}
                >
                  {comparisonResult}
                </Typography>
              )}

              {uploadMessage && (
                <Typography
                  style={{
                    color: uploadMessage.includes("successfully") ? "green" : "red",
                  }}
                >
                  {uploadMessage}
                </Typography>
              )}

              {/* Error and Success Messages */}
              {errors.general && <Typography color="error">{errors.general}</Typography>}
              {successMessage && (
                <Typography style={{ color: "green" }}>{successMessage}</Typography>
              )}

              {/* Submit */}
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

