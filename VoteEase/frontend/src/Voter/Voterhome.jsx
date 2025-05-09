// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { Typography } from '@mui/material';
// import { Info } from '@mui/icons-material'; // Import the Info icon
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import AHP from '/images/AHP.webp'; // Path to your background image

// export default function Voterhome() {
//   const navigate = useNavigate();
//   const { userInfo } = useContext(UserContext);

//   const handleViewPollClick = () => {
//     console.log(userInfo);
//     navigate('/adminhome/view-poll');
//   };

//   const features = [
//     { label: 'Polling Details', icon: <Info fontSize="large" />, action: handleViewPollClick, color: '#5a03fc' },
//   ];

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         height: '100vh',
//         textAlign: 'center',
//         padding: 3,
//         //backgroundImage: `url(${AHP})`, // Set the background image
//         backgroundSize: 'cover', // Ensure the image covers the entire container
//         backgroundPosition: 'center', // Center the background image
//         backgroundRepeat: 'no-repeat', // Prevent the image from repeating
//       }}
//     >
//       {/* This Box holds the welcome text at the top of the page */}
//       <Box sx={{ marginBottom: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome, Voter
//         </Typography>
//         <Typography variant="h6" gutterBottom>
//           Participate in the election process and make your vote count!
//         </Typography>
//       </Box>

//       {/* Grid for Polling Details Button */}
//       <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
//         <Grid container spacing={5} justifyContent="center">
//           {features.map((feature, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <Box
//                 sx={{
//                   p: 2,
//                   bgcolor: feature.color,
//                   color: 'white',
//                   boxShadow: 3,
//                   borderRadius: 2,
//                   textAlign: 'center',
//                   cursor: 'pointer',
//                   fontSize: "0.875rem",
//                   '&:hover': { opacity: 0.85 },
//                 }}
//                 onClick={feature.action}
//               >
//                 {feature.icon}
//                 <Typography variant="h6" mt={1} sx={{ fontSize: "1rem" }}>
//                   {feature.label}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }





import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Info } from '@mui/icons-material'; // Import the Info icon
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import AHP from '/images/AHP.webp'; // Path to your background image

export default function Voterhome() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const handleViewPollClick = () => {
    console.log(userInfo);
    navigate('/adminhome/view-poll');
  };

  const features = [
    { label: 'Polling Details', icon: <Info fontSize="large" />, action: handleViewPollClick, color: '#203252' },
  ];
//#5a03fc
const name = userInfo?.user?.username;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', // Set to row to place instructions on the right
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
        backgroundImage: `url(${AHP})`, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Left Side - Content and Buttons */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* "Welcome" and "Your Vote Matters" animation */}
        <Box sx={{ animation: 'fadeInText 3s ease-out' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: '#2F4F4F',
              fontWeight: 'bold',
              letterSpacing: '1px',
              fontSize: '3rem',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
              animation: 'fadeIn 3s ease-out',
            }}
          >
            
            Welcome, {name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: '#2F4F4F',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
              animation: 'fadeIn 3s ease-out 1s',
            }}
          >
            Participate in the election process and make your vote count!
          </Typography>
        </Box>

        {/* Animation: A simple animated text that gives the idea of "casting votes" */}
        <Typography
          variant="body1"
          sx={{
            color: '#2F4F4F',
            fontSize: '1.2rem',
            marginBottom: 4,
            fontWeight: 'bold',
            animation: 'bounce 2s infinite',
          }}
        >
          Your vote matters! Vote now to make a difference.
        </Typography>

        {/* Grid for Polling Details Button */}
        <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
          <Grid container spacing={5} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: feature.color,
                    color: 'white',
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: "0.875rem",
                    '&:hover': { opacity: 0.85 },
                  }}
                  onClick={feature.action}
                >
                  {feature.icon}
                  <Typography variant="h6" mt={1} sx={{ fontSize: "1rem" }}>
                    {feature.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Right Side - Instructions Section */}
      <Box
        sx={{
          flex: 0.4,
          padding: 3,
          marginLeft: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          animation: 'fadeIn 3s ease-out 2s', // Animation for instructions box
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            color: 'blue', // Light yellow for instructions
            animation: 'fadeIn 2s ease-out', // Animation for header
          }}
        >
          How to Cast Your Vote
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'black', // Light yellow for instructions text
            lineHeight: 1.6,
            fontSize: '1.1rem',
            animation: 'fadeIn 2s ease-out 1s', // Animation for text
          }}
        >
          1. Click <strong>Polling Details</strong>.<br />
          2. If the poll exists and registration is open, click <strong>Register for the Poll</strong>.<br />
          3. Enter and upload your ID proof, then click <strong>Register</strong>.<br />
          4. Wait for the poll to start. After admin verification, log in again.<br />
          5. Once the poll starts, click <strong>Cast Vote</strong> to vote.
        </Typography>
      </Box>

      {/* Inline CSS for Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes fadeInText {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}






// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import VoterCard from './VoterCard'; // Adjust the import path accordingly

// export default function Voterhome() {
//   const navigate = useNavigate();
//   const { userInfo } = useContext(UserContext);

//   const handleViewPollClick = () => {
//     console.log(userInfo);
//     navigate('/adminhome/view-poll');
//   };

//   const handleVoteClick = () => {
//     navigate('/voter/votingpage');
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           flexDirection: 'column',
//           gap: 2,
//         }}
//       >
//         {userInfo && <VoterCard user={userInfo.user} />}
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleViewPollClick}
//         >
//           Polling Details
//         </Button>
//         <Button
//           variant="contained"
//           color="info"
//           onClick={handleVoteClick}
//         >
//           Cast Vote
//         </Button>
//       </Box>
//     </>
//   );
// }
