
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography,Paper } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import React, { useState, useContext,useRef } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

// const defaultTheme = createTheme();

// export default function AdminSignupPage() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const webcamRef = useRef(null);
//   const [webcamImage, setWebcamImage] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [comparisonResult, setComparisonResult] = useState("");
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [enteredOtp, setEnteredOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [username, setUsername] = useState('');
//   const [EmployeeId, setEmployeeId] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const [aadharImage,setAadharImage]=useState('');
//   const [adminverified,setAdminverified]=useState(false);
//   // const [VerifyAdmin,setVerifyAdmin]=useState(null);
  
//   const [errors, setErrors] = useState({ IdError: '', passwordError: '', usernameError: '', emailError: '', otpError: '' });

//   const { userInfo, setUserInfo } = useContext(UserContext);

//   // Send OTP Function
//   const handleSendOtp = async () => {
//     try {
//         const response = await fetch('http://127.0.0.1:3000/send-admin-otp', {
//             method: 'POST',
//             body: JSON.stringify({ email }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         const data = await response.json();

//         if (response.ok) {
//             setOtpSent(true);
//             setErrors({ ...errors, emailError: '' });
//         } else {
//             // Handle error messages from backend properly
//             setErrors({ 
//                 ...errors, 
//                 emailError: data.errors?.email || data.message || 'Enter valid Email' 
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         setErrors({ ...errors, emailError: 'Error sending OTP' });
//     }
// };


// const handleVerifyAdmin=async()=>
// {
  

// }

  
//   const handleVerifyOtp = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/verify-admin-otp', {
//         method: 'POST',
//         body: JSON.stringify({ email, enteredOtp }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setOtpVerified(true);
//         setErrors({ ...errors, otpError: '' });
//         //alert('OTP Verified! You can now enter your details.');  // ✅ Show alert
//       } else {
//         setErrors({ ...errors, otpError: data.message || 'Invalid OTP' });
//       }
//     } catch (err) {
//       console.log(err);
//       setErrors({ ...errors, otpError: 'Error verifying OTP' });
//     }
//   };

//   // Handle Admin Signup
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('http://127.0.0.1:3000/adminsignup', {
//         method: 'POST',
//         body: JSON.stringify({ username, EmployeeId, password, email }),
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       const data = await response.json();
//       if (!data.user) {
//         setErrors({
//           IdError: data.errors?.EmployeeId || '',
//           passwordError: data.errors?.password || '',
//           usernameError: data.errors?.username || '',
//           emailError: data.errors?.email || '',
//         });
//       }

//       if (data.user) {
//         setUserInfo(data);
//         setRedirect(true);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (redirect) {
//     return <Navigate to='/adminhome' />;
//   }

//   return (
//     <>
//       <ThemeProvider theme={defaultTheme}>
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
//             Create Admin Account
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               {/* Email Field + Send OTP */}
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
  
//               {/* OTP Field + Verify OTP */}
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
//               <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Upload Aadhaar Card
//                 </Typography>
//                 <input
//                   accept="image/*"
//                   id="aadhar-upload"
//                   type="file"
//                   style={{ display: 'none' }}
//                   onChange={(e) => setAadharImage(e.target.files[0])}
//                   disabled={!otpVerified}
//                 />
//                 <label htmlFor="aadhar-upload">
//                   <Button
//                     variant="contained"
//                     component="span"
//                     startIcon={<UploadFileIcon />}
//                     disabled={!otpVerified}
//                     sx={{ mt: 1 }}
//                   >
//                     Choose File
//                   </Button>
//                 </label>
//                 {aadharImage && (
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Selected: {aadharImage.name}
//                   </Typography>
//                 )}
//               </Paper>
//             </Grid>
              
//             <Grid item xs={4}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{ height: '100%' }}
//                   onClick={handleVerifyAdmin}
//                   disabled={!aadharImage}
//                 >
//                  Verify Admin
//                 </Button>
//               </Grid>
 
//               {/* Remaining Fields (Disabled until OTP is verified) */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="employeeId"
//                   label="Employee ID"
//                   name="aEmployee ID"
//                   autoComplete="EmployeeId"
//                   value={EmployeeId}
//                   onChange={e => setEmployeeId(e.target.value)}
//                   disabled={!(otpVerified && adminverified)}

//                 />
//                 <Typography color="error">{errors.EmployeeIdError}</Typography>
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
//                   disabled={!(otpVerified && adminverified)}

//                 />
//                 <Typography color="error">{errors.usernameError}</Typography>
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
//                   disabled={!(otpVerified && adminverified)}

//                 />
//                 <Typography color="error">{errors.passwordError}</Typography>
//               </Grid>
//             </Grid>
  
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={!(otpVerified && adminverified)}

//             >
//               Sign Up
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//       </ThemeProvider>
//     </>
//   );
// }



import React, { useState, useRef, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import {
  Avatar, Box, Button, Container, CssBaseline, Grid,
  TextField, Typography, Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Webcam from 'react-webcam';

export default function AdminSignupPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const webcamRef = useRef(null);
  const [webcamImage, setWebcamImage] = useState(null);
  const [webcamImagePreview, setWebcamImagePreview] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [EmployeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [aadharImage, setAadharImage] = useState('');
  const [adminVerified, setAdminVerified] = useState(false);
  const [comparisonResult, setComparisonResult] = useState('');
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [adminImage,setAdminImage]=useState(null);

  const [errors, setErrors] = useState({
    IdError: '', passwordError: '', usernameError: '', emailError: '', otpError: ''
  });

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/send-admin-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setErrors({ ...errors, emailError: '' });
      } else {
        setErrors({ ...errors, emailError: data.errors?.email || 'Enter valid Email' });
      }
    } catch (err) {
      setErrors({ ...errors, emailError: 'Error sending OTP' });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/verify-admin-otp', {
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
      setErrors({ ...errors, otpError: 'Error verifying OTP' });
    }
  };
  const  uploadAdminImage=async(webcamImage)=>
  {
    if(!webcamImage)return;
    try {
      const formData = new FormData();
      formData.append("file", webcamImage);
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

      setAdminImage(data.secure_url);
      //showMessageFor5Seconds(setUploadMessage, "ID proof uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      //showMessageFor5Seconds(setUploadMessage, "Failed to upload ID proof.");
    }
  }

  const handleVerifyAdmin = async () => {
    if (!webcamImage || !aadharImage) return;
  
    const formData = new FormData();
    formData.append('webcamImage', dataURLtoFile(webcamImage, 'webcam.png'));
    formData.append('aadharImage', aadharImage);
  
    try {
      const response = await fetch('http://127.0.0.1:3000/verifyadmin', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        setAdminVerified(true);
        setComparisonResult(data.message || '✅ Admin verified successfully');
        const cleanedAadhaar = data.aadhaar_number.replace(/\s+/g, '');
        setEmployeeId(cleanedAadhaar);
        setUsername(data.name);
        uploadAdminImage(webcamImage);
      } else {
        if (response.status === 422 || response.status === 409) {
          const errorType = data.errorType || '';
          const errorMessage = data.error || 'Verification failed.';
  
          if (errorType === 'aadhaar') {
            setComparisonResult("❌ Aadhaar validation failed: " + errorMessage);
          } else if (errorType === 'face_match') {
            setComparisonResult("❌ Face recognition failed: " + errorMessage);
          } else {
            setComparisonResult("❌ " + errorMessage);
          }
        } else {
          setComparisonResult("❌ Unexpected error occurred during admin verification.");
        }
      }
    } catch (err) {
      console.error(err);
      setComparisonResult('❌ Error verifying admin (client-side)');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3000/adminsignup', {
        method: 'POST',
        body: JSON.stringify({ username, EmployeeId, password, email,adminImage }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (!data.user) {
        setErrors({
          IdError: data.errors?.EmployeeId || '',
          passwordError: data.errors?.password || '',
          usernameError: data.errors?.username || '',
          emailError: data.errors?.email || '',
        });
      }
      if (data.user) {
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
    return <Navigate to='/adminhome' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Create Admin Account</Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Email and OTP */}
            <Grid item xs={8}>
              <TextField
                required fullWidth id="email" label="Email" name="email"
                value={email} onChange={e => setEmail(e.target.value)} 
                // disabled={otpSent}
              />
              <Typography color="error">{errors.emailError}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" sx={{ height: '100%' }}
                onClick={handleSendOtp} disabled={!email || otpSent}>
                Send OTP
              </Button>
            </Grid>
            {otpSent && !otpVerified && (
              <Grid item xs={12}>
                <Typography color="Green">OTP sent to your email</Typography>
              </Grid>
            )}
            {otpSent && (
              <>
                <Grid item xs={8}>
                  <TextField
                    required fullWidth label="Enter OTP" name="otp" value={enteredOtp}
                    onChange={e => setEnteredOtp(e.target.value)} 
                    // disabled={otpVerified}
                  />
                  <Typography color="error">{errors.otpError}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="contained" sx={{ height: '100%' }}
                    onClick={handleVerifyOtp} disabled={!enteredOtp || otpVerified}>
                    Verify OTP
                  </Button>
                </Grid>
              </>
            )}
             {otpVerified && (
              <Grid item xs={12}>
                <Typography color="green">OTP verified successfully!</Typography>
              </Grid>
            )}

            {/* Aadhaar Upload */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1">Upload ID Card</Typography>
                <input
                  accept="image/*" id="aadhar-upload" type="file" style={{ display: 'none' }}
                  onChange={(e) => setAadharImage(e.target.files[0])}
                  // disabled={!otpVerified}
                />
                <label htmlFor="aadhar-upload">
                  <Button variant="contained" component="span" startIcon={<UploadFileIcon />}
                   // disabled={!otpVerified} 
                   sx={{ mt: 1 }}>
                    Choose File
                  </Button>
                </label>
                {aadharImage && <Typography variant="body2" sx={{ mt: 1 }}>Selected: {aadharImage.name}</Typography>}
              </Paper>
            </Grid>

            {/* Webcam Image */}
            {!webcamImagePreview && !showWebcam && (
              <Grid item xs={12}>
                <Button onClick={() => setShowWebcam(true)} //disabled={!aadharImage}
                  >Capture Live Image
                  
                </Button>
              </Grid>
            )}
            {showWebcam && (
              <Grid item xs={12}>
                <Webcam
                  audio={false} ref={webcamRef} screenshotFormat="image/png"
                  width="100%" videoConstraints={{ facingMode: 'user' }}
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

            {/* Verify Admin */}
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary"
                onClick={handleVerifyAdmin} //disabled={!webcamImage || !aadharImage}
                >
                Verify Admin
              </Button>
              {comparisonResult && (
                <Typography color={adminVerified ? 'green' : 'red'}>{comparisonResult}</Typography>
              )}
            </Grid>

            {/* Fields for verified users */}
            <Grid item xs={12}>
              <TextField
                required fullWidth label="Employee ID" name="employeeId"
                value={EmployeeId} 
                // onChange={e => setEmployeeId(e.target.value)}
               // disabled={!(otpVerified && adminVerified)}
              />
              <Typography color="error">{errors.IdError}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth label="Name" name="username"
                value={username} 
                //onChange={e => setUsername(e.target.value)}
                //disabled={!(otpVerified && adminVerified)}
              />
              <Typography color="error">{errors.usernameError}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth label="Password" name="password" type="password"
                value={password} onChange={e => setPassword(e.target.value)}
               // disabled={!(otpVerified && adminVerified)}
              />
              <Typography color="error">{errors.passwordError}</Typography>
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
               // disabled={!(otpVerified && adminVerified)}
                >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}



