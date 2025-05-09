// import React, { useRef, useState ,useContext} from "react";
// import { useNavigate } from "react-router-dom";
// import Webcam from "react-webcam";
// import { UserContext } from "../UserContext";
// const VerifyFaceMatch = () => {
//   const { userInfo } = useContext(UserContext);
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();
//   const [webcamImage, setWebcamImage] = useState(null);
//   const [comparisonResult, setComparisonResult] = useState("");
//   const [isComparing, setIsComparing] = useState(false);

//   const videoConstraints = {
//     width: 400,
//     height: 400,
//     facingMode: "user",
//   };

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     const byteString = atob(imageSrc.split(",")[1]);
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([ab], { type: "image/jpeg" });
//     setWebcamImage(blob);
//     setComparisonResult("");
//   };

//   const handleCompare = async () => {
//     if (!webcamImage) {
//       setComparisonResult("Please capture a live image.");
//       return;
//     }

//     if (!userInfo?.user?.voterImage) {
//       setComparisonResult("Stored image not found.");
//       return;
//     }

//     setIsComparing(true);
//     setComparisonResult("");

//     try {
//       // Fetch Cloudinary image and convert to blob
//       const storedImageResponse = await fetch(userInfo.user.voterImage);
//       const storedImageBlob = await storedImageResponse.blob();
//       const storedImageFile = new File([storedImageBlob], "stored.jpg", { type: "image/jpeg" });

//       // Convert webcam image blob to File
//       const liveImageFile = new File([webcamImage], "live.jpg", { type: "image/jpeg" });

//       const formData = new FormData();
//       formData.append("image1", liveImageFile);
//       formData.append("image2", storedImageFile);

//       const response = await fetch("http://127.0.0.1:3000/compare", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const data = await response.json();
//       console.log(data);

//       if (data.result=== "faces_match") {
//         setComparisonResult("✅ Face match successful.");
//         setTimeout(() => navigate('/voter/votingpage'), 1500);
        
//       } else if (data.similarity === "faces_do_not_match") {
//         setComparisonResult("❌ Face match failed. Please try again.");
//       } else {
//         setComparisonResult("⚠️ Unexpected result.");
//       }
//     } catch (error) {
//       console.error("Error during comparison:", error);
//       setComparisonResult("⚠️ Error during face comparison.");
//     } finally {
//       setIsComparing(false);
//     }
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Verify Face to Proceed with Poll Registration</h2>

//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={videoConstraints}
//       />
//       <br />

//       <button onClick={capture} style={{ marginTop: "10px" }}>
//         Capture Image
//       </button>

//       {webcamImage && (
//         <div style={{ marginTop: "1rem" }}>
//           <h4>Captured Image Preview:</h4>
//           <img
//             src={URL.createObjectURL(webcamImage)}
//             alt="Captured"
//             width={200}
//             style={{ border: "1px solid #ccc" }}
//           />
//         </div>
//       )}

//       <button
//         onClick={handleCompare}
//         style={{ marginTop: "1rem" }}
//         disabled={isComparing}
//       >
//         {isComparing ? "Comparing..." : "Verify Face Match"}
//       </button>

//       {comparisonResult && (
//         <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{comparisonResult}</p>
//       )}
//     </div>
//   );
// };

// export default VerifyFaceMatch;
import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { UserContext } from "../UserContext";
import {
  Grid,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const VerifyFaceMatch = () => {
  const { userInfo } = useContext(UserContext);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [webcamImage, setWebcamImage] = useState(null);
  const [comparisonResult, setComparisonResult] = useState("");
  const [isComparing, setIsComparing] = useState(false);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  const startWebcam = () => {
    setWebcamEnabled(true);
    setWebcamImage(null);
    setComparisonResult("");
  };

  const capture = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    const byteString = atob(imageSrc.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/jpeg" });
    setWebcamImage(blob);
    setWebcamEnabled(false); // turn off webcam after capture
    setComparisonResult("");
  };

  const handleCompare = async () => {
    if (!webcamImage) {
      setComparisonResult("Please capture a live image.");
      return;
    }

    if (!userInfo?.user?.voterImage) {
      setComparisonResult("Stored image not found.");
      return;
    }

    setIsComparing(true);
    setComparisonResult("");

    try {
      const storedImageResponse = await fetch(userInfo.user.voterImage);
      const storedImageBlob = await storedImageResponse.blob();
      const storedImageFile = new File([storedImageBlob], "stored.jpg", {
        type: "image/jpeg",
      });

      const liveImageFile = new File([webcamImage], "live.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("image1", liveImageFile);
      formData.append("image2", storedImageFile);

      const response = await fetch("http://127.0.0.1:3000/compare", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (data.result === "faces_match") {
        setComparisonResult("✅ Face match successful.");
        setTimeout(() => navigate("/voter/votingpage"), 1500);
      } else if (data.similarity === "faces_do_not_match") {
        setComparisonResult("❌ Face match failed. Please try again.");
      } else {
        setComparisonResult("⚠️ Unexpected result: No Face decteted.");
      }
    } catch (error) {
      console.error("Error during comparison:", error);
      setComparisonResult("⚠️ Error during face comparison.");
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={11} sm={8} md={6}>
        <Paper elevation={4} style={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Verify Face to Proceed with Vote Casting
          </Typography>

          {!webcamEnabled && !webcamImage && (
            <Button
              variant="contained"
              color="primary"
              onClick={startWebcam}
              style={{ marginTop: "1rem" }}
            >
              Enable Webcam and Capture Live Image
            </Button>
          )}

          {webcamEnabled && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{ marginTop: "1rem" }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={capture}
                style={{ marginTop: "1rem" }}
              >
                Take Snapshot
              </Button>
            </>
          )}

          {webcamImage && (
            <div style={{ marginTop: "2rem" }}>
              <Typography variant="subtitle1">Captured Image Preview:</Typography>
              <img
                src={URL.createObjectURL(webcamImage)}
                alt="Captured"
                width={250}
                style={{
                  marginTop: "1rem",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <div style={{ marginTop: "1rem" }}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={startWebcam}
                  style={{ marginRight: "1rem" }}
                >
                  Retake Image
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCompare}
                  disabled={isComparing}
                >
                  {isComparing ? <CircularProgress size={20} /> : "Verify Face Match"}
                </Button>
              </div>
            </div>
          )}

          {comparisonResult && (
            <Typography
              variant="subtitle1"
              style={{ marginTop: "2rem", fontWeight: "bold" }}
              color={
                comparisonResult.includes("successful")
                  ? "green"
                  : comparisonResult.includes("failed")
                  ? "error"
                  : "warning.main"
              }
            >
              {comparisonResult}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VerifyFaceMatch;
