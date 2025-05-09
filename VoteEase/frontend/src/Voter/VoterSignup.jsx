// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import React, { useContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';

// const defaultTheme = createTheme();

// export default function VoterSignupPage() {
//   const [email, setEmail] = useState('');
//   const [enteredOtp, setEnteredOtp] = useState('');
//   const [username, setUsername] = useState('');
//   const [voterid, setVoterid] = useState('');
//   const [password, setPassword] = useState('');
//   const [dob, setDob] = useState('');
//   const [age, setAge] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [errors, setErrors] = useState({
//     ageError: '', voteridError: '', passwordError: '', usernameError: '', emailError: '', otpError: ''
//   });
//   const [redirect, setRedirect] = useState(false);
//   const { userInfo, setUserInfo } = useContext(UserContext);

//   const calculateAgeFromDob = (dobStr) => {
//     const dobDate = new Date(dobStr);
//     const today = new Date();
//     let age = today.getFullYear() - dobDate.getFullYear();
//     const m = today.getMonth() - dobDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const handleDobChange = (e) => {
//     const dobInput = e.target.value;
//     setDob(dobInput);
//     const calculatedAge = calculateAgeFromDob(dobInput);
//     setAge(calculatedAge);
//     if (calculatedAge < 18) {
//       setErrors(prev => ({ ...prev, ageError: 'You must be at least 18 years old to create an account.' }));
//     } else {
//       setErrors(prev => ({ ...prev, ageError: '' }));
//     }
//   };

//   const handleSendOtp = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/send-otp', {
//         method: 'POST',
//         body: JSON.stringify({ email }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setOtpSent(true);
//         setErrors({ ...errors, emailError: '' });
//       } else {
//         setErrors({ 
//           ...errors, 
//           emailError: data.errors?.email || data.message || 'Enter valid Email' 
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       setErrors({ ...errors, emailError: 'Error sending OTP' });
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/verify-otp', {
//         method: 'POST',
//         body: JSON.stringify({ email, enteredOtp }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setOtpVerified(true);
//         setErrors({ ...errors, otpError: '' });
//       } else {
//         setErrors({ ...errors, otpError: data.message || 'Invalid OTP' });
//       }
//     } catch (err) {
//       console.log(err);
//       setErrors({ ...errors, otpError: 'Error verifying OTP' });
//     }
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const age = calculateAgeFromDob(dob);
//     if (age < 18) {
//       setErrors(prev => ({ ...prev, ageError: 'You must be at least 18 years old to create an account.' }));
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:3000/votersignup', {
//         method: 'POST',
//         body: JSON.stringify({ username, voterid, password,dob, email }),
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include'
//       });
//       const data = await response.json();
//       if (!data.user) {
//         setErrors({
//           ageError: data.errors.age,
//           voteridError: data.errors.voterid,
//           passwordError: data.errors.password,
//           usernameError: data.errors.username,
//           emailError: data.errors.email,
//         });
//       } else {
//         setUserInfo(data);
//         setRedirect(true);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (redirect) {
//     return <Navigate to='/voterhome' />
//   }

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Create Account
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={8}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email"
//                   name="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   disabled={otpSent}
//                 />
//                 <Typography color="error">{errors.emailError}</Typography>
//               </Grid>
//               <Grid item xs={4}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{ height: '100%' }}
//                   onClick={handleSendOtp}
//                   disabled={!email || otpSent}
//                 >
//                   Send OTP
//                 </Button>
//               </Grid>
//               {otpSent && (
//                 <Grid item xs={12}>
//                   <Typography sx={{ color: 'green', fontSize: '14px' }}>
//                     ✅ OTP Sent Successfully
//                   </Typography>
//                 </Grid>
//               )}

//               {otpSent && (
//                 <>
//                   <Grid item xs={8}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="otp"
//                       label="Enter OTP"
//                       name="otp"
//                       autoComplete="off"
//                       value={enteredOtp}
//                       onChange={e => setEnteredOtp(e.target.value)}
//                       disabled={otpVerified}
//                     />
//                     <Typography color="error">{errors.otpError}</Typography>
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{ height: '100%' }}
//                       onClick={handleVerifyOtp}
//                       disabled={!enteredOtp || otpVerified}
//                     >
//                       Verify OTP
//                     </Button>
//                   </Grid>
//                   {otpVerified && (
//                     <Grid item xs={12}>
//                       <Typography sx={{ color: 'green', fontSize: '14px' }}>
//                         ✅ OTP Verified! You can enter your details.
//                       </Typography>
//                     </Grid>
//                   )}
//                 </>
//               )}






























//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="voterid"
//                   label="Voter ID Number"
//                   name="voterid"
//                   autoComplete="voterid"
//                   value={voterid}
//                   onChange={e => setVoterid(e.target.value)}
//                   disabled={!otpVerified}
//                 />
//                 <Typography color="error">{errors.voteridError}</Typography>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="userName"
//                   label="Name"
//                   name="username"
//                   autoComplete="given-name"
//                   value={username}
//                   onChange={e => setUsername(e.target.value)}
//                   disabled={!otpVerified}
//                 />
//                 <Typography color="error">{errors.usernameError}</Typography>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   type="date"
//                   label="Date of Birth"
//                   InputLabelProps={{ shrink: true }}
//                   name="dob"
//                   value={dob}
//                   onChange={handleDobChange}
//                   disabled={!otpVerified}
//                 />
//                 <Typography color="error">{errors.ageError}</Typography>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   disabled={!otpVerified}
//                 />
//                 <Typography color="error">{errors.passwordError}</Typography>
//               </Grid>
//             </Grid>

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={!otpVerified}
//             >
//               Sign Up
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }







import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useContext, useState,useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Paper from '@mui/material/Paper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Webcam from 'react-webcam';
import CircularProgress from '@mui/material/CircularProgress';


const defaultTheme = createTheme();

export default function VoterSignupPage() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [username, setUsername] = useState('');

   const webcamRef = useRef(null);

const [webcamImage, setWebcamImage] = useState(null);
  const [webcamImagePreview, setWebcamImagePreview] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [voteridImage, setVoteridImage] = useState('');
  const [voterVerified, setVoterVerified] = useState(false);
  const [comparisonResult, setComparisonResult] = useState('');
  const [voterImage,setVoterImage]=useState(null);

  const [isComparing, setIsComparing] = useState(false);
  

  const [voterid, setVoterid] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [photouploaded,setPhotouploaded]=useState(false);
 
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [errors, setErrors] = useState({
    ageError: '', voteridError: '', passwordError: '', usernameError: '', emailError: '', otpError: ''
  });

  const calculateAgeFromDob = (dobStr) => {
    const dobDate = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  };


  // const  uploadVoterImage=async(webcamImage)=>
  //   {
  //     if(!webcamImage)return;
  //     try {
  //       const formData = new FormData();
  //       formData.append("file", webcamImage);
  //       formData.append("upload_preset", "Registered_voters");
  
  //       const response = await fetch(
  //         "https://api.cloudinary.com/v1_1/dw4reriae/image/upload",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );
  
  //       const data = await response.json();
  
  //       if (!response.ok) {
  //         throw new Error("Failed to upload image.");
  //       }
  
  //       setVoterImage(data.secure_url);
  //       //showMessageFor5Seconds(setUploadMessage, "ID proof uploaded successfully!");
  //     } catch (err) {
  //       console.error("Upload error:", err);
  //       //showMessageFor5Seconds(setUploadMessage, "Failed to upload ID proof.");
  //     }
  //   }
  
  
  // const uploadVoterImage = async () => {
  //   if (!voteridImage || !webcamImage) return;
  
  //   try {
  //     // Upload Voter ID image
  //     const formDataId = new FormData();
  //     formDataId.append("file", voteridImage);
  //     formDataId.append("upload_preset", "Registered_voters");
  
  //     const responseId = await fetch(
  //       "https://api.cloudinary.com/v1_1/dw4reriae/image/upload",
  //       {
  //         method: "POST",
  //         body: formDataId,
  //       }
  //     );
  
  //     const dataId = await responseId.json();
  
  //     if (!responseId.ok) {
  //       throw new Error("Failed to upload Voter ID image.");
  //     }
  
  //     const voterIdImageUrl = dataId.secure_url;
  //     console.log("Voter ID image uploaded:", voterIdImageUrl);
  
  //     // Upload Webcam (face) image
  //     const formDataFace = new FormData();
  //     formDataFace.append("file", webcamImage);
  //     formDataFace.append("upload_preset", "Registered_voters");
  
  //     const responseFace = await fetch(
  //       "https://api.cloudinary.com/v1_1/dw4reriae/image/upload",
  //       {
  //         method: "POST",
  //         body: formDataFace,
  //       }
  //     );
  
  //     const dataFace = await responseFace.json();
  
  //     if (!responseFace.ok) {
  //       throw new Error("Failed to upload face image.");
  //     }
  
  //     const faceImageUrl = dataFace.secure_url;
  //     console.log("Face image uploaded:", faceImageUrl);
  
  //     // Now set both URLs
  //     setVoterImage(faceImageUrl);
  //     setVoteridImage(voterIdImageUrl);
  //     setPhotouploaded(true); // <-- Create this state if not already
  
  //     // Optionally show messages
  //     // showMessageFor5Seconds(setUploadMessage, "Images uploaded successfully!");
  
  //   } catch (err) {
  //     console.error("Upload error:", err);
  //     // showMessageFor5Seconds(setUploadMessage, "Failed to upload images.");
  //   }
  // };
  const uploadVoterImage = async () => {
    if (!voteridImage || !webcamImage) return;
  
    try {
      setLoading(true); // Start loading
  
      // Upload Voter ID image
      const formDataId = new FormData();
      formDataId.append("file", voteridImage);
      formDataId.append("upload_preset", "Registered_voters");
  
      const responseId = await fetch(
        "https://api.cloudinary.com/v1_1/dw4reriae/image/upload",
        {
          method: "POST",
          body: formDataId,
        }
      );
  
      const dataId = await responseId.json();
  
      if (!responseId.ok) {
        throw new Error("Failed to upload Voter ID image.");
      }
  
      const voterIdImageUrl = dataId.secure_url;
      console.log("Voter ID image uploaded:", voterIdImageUrl);
  
      // Upload Webcam (face) image
      const formDataFace = new FormData();
      formDataFace.append("file", webcamImage);
      formDataFace.append("upload_preset", "Registered_voters");
  
      const responseFace = await fetch(
        "https://api.cloudinary.com/v1_1/dw4reriae/image/upload",
        {
          method: "POST",
          body: formDataFace,
        }
      );
  
      const dataFace = await responseFace.json();
  
      if (!responseFace.ok) {
        throw new Error("Failed to upload face image.");
      }
  
      const faceImageUrl = dataFace.secure_url;
      console.log("Face image uploaded:", faceImageUrl);
  
      // Now set both URLs
      setVoterImage(faceImageUrl);
      setVoteridImage(voterIdImageUrl);
      setPhotouploaded(true);
  
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false); // Stop loading in any case
    }
  };
  
  

    const handleVerifyVoter = async () => {
      if (!voteridImage || !webcamImage) {
        setComparisonResult("Please upload your ID proof and capture a live image.");
        return;
      }
  
      setIsComparing(true);
      const formData = new FormData();
      formData.append('image1', dataURLtoFile(webcamImage, 'webcam.png'));
      formData.append("image2", voteridImage);
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
          setVoterVerified(true);
          await  uploadVoterImage();
        } else {
          setComparisonResult("Face match failed. Please try again.");
        }
      } catch (err) {
        setComparisonResult("Error during comparison. Try again.");
      } finally {
        setIsComparing(false);
      }
    };
    
  
    const handleCaptureWebcamImage = () => {
      if (webcamRef.current && webcamRef.current.getScreenshot) {
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
          setWebcamImage(screenshot);
          setWebcamImagePreview(screenshot);
          setShowWebcam(false);
        } else {
          alert('Failed to capture image. Please try again.');
        }
      } else {
        alert('Webcam is not ready. Please wait a moment.');
      }
    };

  const handleDobChange = (e) => {
    const dobInput = e.target.value;
    setDob(dobInput);
    const calculatedAge = calculateAgeFromDob(dobInput);
    setAge(calculatedAge);
    if (calculatedAge < 18) {
      setErrors(prev => ({ ...prev, ageError: 'You must be at least 18 years old to create an account.' }));
    } else {
      setErrors(prev => ({ ...prev, ageError: '' }));
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setErrors({ ...errors, emailError: '' });
      } else {
        setErrors({ 
          ...errors, 
          emailError: data.errors?.email || data.message || 'Enter valid Email' 
        });
      }
    } catch (err) {
      console.log(err);
      setErrors({ ...errors, emailError: 'Error sending OTP!! Please Check your Network' });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, enteredOtp }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setOtpVerified(true);
        setErrors({ ...errors, otpError: '' });
      } else {
        setErrors({ ...errors, otpError: data.message || 'Invalid OTP' });
      }
    } catch (err) {
      console.log(err);
      setErrors({ ...errors, otpError: 'Error verifying OTP' });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const age = calculateAgeFromDob(dob);
    if (age < 18) {
      setErrors(prev => ({ ...prev, ageError: 'You must be at least 18 years old to create an account.' }));
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/votersignup', {
        method: 'POST',
        body: JSON.stringify({ username, voterid, password,dob, email,voterImage,voteridImage}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (!data.user) {
        setErrors({
          ageError: data.errors.age,
          voteridError: data.errors.voterid,
          passwordError: data.errors.password,
          usernameError: data.errors.username,
          emailError: data.errors.email,
        });
      } else {
        setUserInfo(data);
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };


  if (redirect) {
    return <Navigate to='/voterhome' />
  }

  return (
    // <ThemeProvider theme={defaultTheme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Create Account
    //       </Typography>
    //       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={8}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email"
    //               name="email"
    //               autoComplete="email"
    //               value={email}
    //               onChange={e => setEmail(e.target.value)}
    //               disabled={otpSent}
    //             />
    //             <Typography color="error">{errors.emailError}</Typography>
    //           </Grid>
    //           <Grid item xs={4}>
    //             <Button
    //               fullWidth
    //               variant="contained"
    //               sx={{ height: '100%' }}
    //               onClick={handleSendOtp}
    //               disabled={!email || otpSent}
    //             >
    //               Send OTP
    //             </Button>
    //           </Grid>
    //           {otpSent && (
    //             <Grid item xs={12}>
    //               <Typography sx={{ color: 'green', fontSize: '14px' }}>
    //                 ✅ OTP Sent Successfully
    //               </Typography>
    //             </Grid>
    //           )}

    //           {otpSent && (
    //             <>
    //               <Grid item xs={8}>
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   id="otp"
    //                   label="Enter OTP"
    //                   name="otp"
    //                   autoComplete="off"
    //                   value={enteredOtp}
    //                   onChange={e => setEnteredOtp(e.target.value)}
    //                   disabled={otpVerified}
    //                 />
    //                 <Typography color="error">{errors.otpError}</Typography>
    //               </Grid>
    //               <Grid item xs={4}>
    //                 <Button
    //                   fullWidth
    //                   variant="contained"
    //                   sx={{ height: '100%' }}
    //                   onClick={handleVerifyOtp}
    //                   disabled={!enteredOtp || otpVerified}
    //                 >
    //                   Verify OTP
    //                 </Button>
    //               </Grid>
    //               {otpVerified && (
    //                 <Grid item xs={12}>
    //                   <Typography sx={{ color: 'green', fontSize: '14px' }}>
    //                     ✅ OTP Verified! You can enter your details.
    //                   </Typography>
    //                 </Grid>
    //               )}
    //             </>
    //           )}





    //        <Grid item xs={12}>
    //           <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
    //             <Typography variant="subtitle1">Upload ID Card</Typography>
    //             <input
    //               accept="image/*" id="aadhar-upload" type="file" style={{ display: 'none' }}
    //               onChange={(e) => setVoteridImage(e.target.files[0])} disabled={!otpVerified}
    //             />
    //             <label htmlFor="aadhar-upload">
    //               <Button variant="contained" component="span" startIcon={<UploadFileIcon />}
    //                 disabled={!otpVerified} sx={{ mt: 1 }}>
    //                 Choose File
    //               </Button>
    //             </label>
    //             {voteridImage && <Typography variant="body2" sx={{ mt: 1 }}>Selected: {voteridImage.name}</Typography>}
    //           </Paper>
    //         </Grid>

    //         {/* Webcam Image */}
    //         {!webcamImagePreview && !showWebcam && (
    //           <Grid item xs={12}>
    //             <Button onClick={() => setShowWebcam(true)} disabled={!voteridImage}>Capture Live Image</Button>
    //           </Grid>
    //         )}
    //         {showWebcam && (
    //           <Grid item xs={12}>
    //             <Webcam
    //               audio={false} ref={webcamRef} screenshotFormat="image/png"
    //               width="100%" videoConstraints={{ facingMode: 'user' }}
    //             />
                
    //             <Button variant="contained" sx={{ mt: 2 }} onClick={handleCaptureWebcamImage}>
    //               Capture Image
    //             </Button>
    //           </Grid>
    //         )}
    //         {webcamImagePreview && (
    //           <Grid item xs={12}>
    //             <img src={webcamImagePreview} alt="Captured" style={{ width: '100%' }} />
    //             <Button
    //               variant="contained"
    //               sx={{ mt: 2 }}
    //               onClick={() => {
    //                 setWebcamImage(null);
    //                 setWebcamImagePreview(null);
    //                 setShowWebcam(false);
    //               }}
    //             >
    //               Retake Image
    //             </Button>

    //           </Grid>
    //         )}

    //         {/* Verify Voter */}
    //         <Grid item xs={12}>
    //           <Button fullWidth variant="contained" color="primary"
    //             onClick={handleVerifyVoter} disabled={!webcamImage || !voteridImage}>
    //             Verify Voter
    //           </Button>
    //           {comparisonResult && (
    //             <Typography color={voterVerified ? 'green' : 'red'}>{comparisonResult}</Typography>
    //           )}
    //         </Grid>
 
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="voterid"
    //               label="Voter ID Number"
    //               name="voterid"
    //               autoComplete="voterid"
    //               value={voterid}
    //               onChange={e => setVoterid(e.target.value)}
    //               disabled={!otpVerified}
    //             />
    //             <Typography color="error">{errors.voteridError}</Typography>
    //           </Grid>

    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="userName"
    //               label="Name"
    //               name="username"
    //               autoComplete="given-name"
    //               value={username}
    //               onChange={e => setUsername(e.target.value)}
    //               disabled={!otpVerified}
    //             />
    //             <Typography color="error">{errors.usernameError}</Typography>
    //           </Grid>

    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               type="date"
    //               label="Date of Birth"
    //               InputLabelProps={{ shrink: true }}
    //               name="dob"
    //               value={dob}
    //               onChange={handleDobChange}
    //               disabled={!otpVerified}
    //             />
    //             <Typography color="error">{errors.ageError}</Typography>
    //           </Grid>

    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="new-password"
    //               value={password}
    //               onChange={e => setPassword(e.target.value)}
    //               disabled={!otpVerified}
    //             />
    //             <Typography color="error">{errors.passwordError}</Typography>
    //           </Grid>
    //         </Grid>

    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //           disabled={!otpVerified}
    //         >
    //           Sign Up
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* Email & Send OTP */}
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    //disabled={otpSent}
                  />
                  <Typography color="error">{errors.emailError}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ height: '100%' }}
                    onClick={handleSendOtp}
                    //disabled={!email || otpSent}
                  >
                    Send OTP
                  </Button>
                </Grid>
    
                {/* OTP Field */}
                {otpSent && (
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'green', fontSize: '14px' }}>
                      ✅ OTP Sent Successfully
                    </Typography>
                  </Grid>
                )}
    
                {otpSent && (
                  <>
                    <Grid item xs={8}>
                      <TextField
                        required
                        fullWidth
                        id="otp"
                        label="Enter OTP"
                        name="otp"
                        autoComplete="off"
                        value={enteredOtp}
                        onChange={e => setEnteredOtp(e.target.value)}
                        //disabled={otpVerified}
                      />
                      <Typography color="error">{errors.otpError}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ height: '100%' }}
                        onClick={handleVerifyOtp}
                        //disabled={!enteredOtp || otpVerified}
                      >
                        Verify OTP
                      </Button>
                    </Grid>
                    {otpVerified && (
                      <Grid item xs={12}>
                        <Typography sx={{ color: 'green', fontSize: '14px' }}>
                          ✅ OTP Verified! You can enter your details.
                        </Typography>
                      </Grid>
                    )}
                  </>
                )}
    
                {/* Upload ID Proof */}
                <Grid item xs={12}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1">Upload ID Card</Typography>
                    <input
                      accept="image/*"
                      id="aadhar-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => setVoteridImage(e.target.files[0])}
                      //disabled={!otpVerified}
                    />
                    <label htmlFor="aadhar-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<UploadFileIcon />}
                        //disabled={!otpVerified}
                        sx={{ mt: 1 }}
                      >
                        Choose File
                      </Button>
                    </label>
                    {voteridImage && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected: {voteridImage.name}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
    
                {/* Webcam Image Capture */}
                {!webcamImagePreview && !showWebcam && (
                  <Grid item xs={12}>
                    <Button onClick={() => setShowWebcam(true)} 
                    //disabled={!voteridImage}
                    >
                      Capture Live Image
                    </Button>
                  </Grid>
                )}
                {showWebcam && (
                  <Grid item xs={12}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      width="100%"
                      videoConstraints={{ facingMode: 'user' }}
                    />
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleCaptureWebcamImage}>
                      Capture Image
                    </Button>
                  </Grid>
                )}
                {webcamImagePreview && (
                  <Grid item xs={12}>
                    <img src={webcamImagePreview} alt="Captured" style={{ width: '100%' }} />
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setWebcamImage(null);
                        setWebcamImagePreview(null);
                        setShowWebcam(false);
                      }}
                    >
                      Retake Image
                    </Button>
                  </Grid>
                )}
    
                {/* Verify Button */}
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleVerifyVoter}
                    //disabled={!webcamImage || !voteridImage}
                  >
                    Verify Voter
                  </Button>
                  {comparisonResult && (
                    <Typography color={voterVerified ? 'green' : 'red'}>
                      {comparisonResult}
                    </Typography>
                  )}
                </Grid>
    
                {/* Side-by-Side Inputs: Voter ID, Name, DOB, Password */}
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="voterid"
                    label="Voter ID Number"
                    name="voterid"
                    autoComplete="voterid"
                    value={voterid}
                    onChange={e => setVoterid(e.target.value)}
                    //disabled={!voterVerified}
                  />
                  <Typography color="error">{errors.voteridError}</Typography>
                </Grid>
    
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="Name"
                    name="username"
                    autoComplete="given-name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    //disabled={!voterVerified}
                  />
                  <Typography color="error">{errors.usernameError}</Typography>
                </Grid>
    
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    InputLabelProps={{ shrink: true }}
                    name="dob"
                    value={dob}
                    onChange={handleDobChange}
                    //disabled={!voterVerified}
                  />
                  <Typography color="error">{errors.ageError}</Typography>
                </Grid>
    
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    //disabled={!voterVerified}
                  />
                  <Typography color="error">{errors.passwordError}</Typography>
                </Grid>
              </Grid>
    
              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                //disabled={!photouploaded || loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
    
  
}




