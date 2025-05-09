
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import for navigation
// import { Container, CssBaseline, Grid, ThemeProvider, Typography, Button, createTheme } from '@mui/material';
// import { grey } from '@mui/material/colors';
// import Homepage from '../images/homepage4.webp';
// import { UserContext } from './UserContext';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

// const backgroundStyle = {
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-start', // Align items to the top
//   alignItems: 'center',
//   backgroundImage: `url(${Homepage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   overflow: 'hidden', // Prevents scrolling
//   paddingTop: '20px', // Add some padding to account for the sticky header
//   position: 'relative', // Needed for absolute positioning of buttons
// };

// const buttonContainerStyle = {
//   position: 'absolute',
//   bottom: '100px', // Distance from bottom of the page
//   right: '20px', // Distance from right of the page
//   display: 'flex',
//   flexDirection: 'column', // Stack buttons vertically
//   gap: '10px', // Space between buttons
// };

// export default function HomePage() {
//   const { userInfo } = useContext(UserContext);
//   const navigate = useNavigate(); // For navigation

//   // Function to handle navigation
//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <ThemeProvider theme={lightTheme}>
//       <CssBaseline />
//       <div style={{ ...backgroundStyle, backgroundColor: grey[200] }}>
//         <Container maxWidth="md">
//           <Grid container justifyContent="center" alignItems="center" spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h4" component="h1" align="center" gutterBottom style={{ marginTop: '5px' }}>
//                 ONLINE ELECTION PLATFORM
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <div style={{ textAlign: 'center' }}>
//                 <Typography variant="body1" color="textPrimary" style={{ marginBottom: '10px' }}>
//                   <strong>Your vote is your voice.</strong> Use it wisely and make a difference.
//                 </Typography>
//                 <Typography variant="body1" color="textPrimary">
//                   Welcome to VoteEase, where casting your vote is simple and secure. VoteEase ensures that every voice counts, making it easier than ever to participate in shaping our future. Join us in empowering democracy, one vote at a time.
//                 </Typography>
//               </div>
//             </Grid>
//           </Grid>
//         </Container>
//         {userInfo && (
//           <div style={buttonContainerStyle}>
//             {userInfo.userType === 'voter' && (
//               <Button
//                 variant="contained"
//                 color="#fc036b"
//                 onClick={() => handleNavigation('/voterhome')}
//               >
//                 Voter Page
//               </Button>
//             )}
//             {userInfo.userType === 'admin' && (
//               <Button
//                 variant="contained"
//                 color="#fc036b"
//                 onClick={() => handleNavigation('/adminhome')}
//               >
//                 Admin Page
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// }




// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, CssBaseline, Grid, ThemeProvider, Typography, Button, createTheme, Box } from '@mui/material';
// import { grey } from '@mui/material/colors';
// import Homepage from '../images/homepage4.webp';
// import { UserContext } from './UserContext';

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

// const backgroundStyle = {
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-start',
//   alignItems: 'center',
//   backgroundImage: `url(${Homepage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   overflow: 'hidden',
//   paddingTop: '20px',
//   position: 'relative',
// };

// const buttonContainerStyle = {
//   position: 'absolute',
//   bottom: '100px',
//   right: '20px',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '10px',
// };

// const pollContainerStyle = {
//   position: 'absolute',
//   left: '20px',
//   bottom: '20px',
//   width: '300px',
//   height: '300px',
//   overflow: 'hidden',
//   display: 'flex',
//   flexDirection: 'column-reverse',
//   border: '1px solid #ccc',
//   borderRadius: '8px',
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   padding: '10px',
// };

// const pollMessageStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   animation: 'scrollTop 10s linear infinite',
// };

// const scrollAnimation = `
//   @keyframes scrollTop {
//     0% {
//       transform: translateY(100%);
//     }
//     50% {
//       transform: translateY(0%);
//     }
//     100% {
//       transform: translateY(-100%);
//     }
//   }
// `;

// export default function HomePage() {
//   const { userInfo } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [poll, setPoll] = useState(null);

//   useEffect(() => {
//     const fetchPoll = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/view-poll');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setPoll(data);
//       } catch (error) {
//         console.error('Error fetching poll:', error);
//       }
//     };

//     fetchPoll();
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const isPollUpcoming = () => {
//     if (!poll) return false;
//     const currentTime = new Date();
//     return new Date(poll.startTime) > currentTime;
//   };


//   return (
//     <ThemeProvider theme={lightTheme}>
//       <CssBaseline />
//       <style>{scrollAnimation}</style>
//       <div style={{ ...backgroundStyle, backgroundColor: grey[200] }}>
//         <Container maxWidth="md">
//           <Grid container justifyContent="center" alignItems="center" spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h4" component="h1" align="center" gutterBottom>
//                 ONLINE ELECTION PLATFORM
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <div style={{ textAlign: 'center' }}>
//                 <Typography variant="body1" color="textPrimary" style={{ marginBottom: '10px' }}>
//                   <strong>Your vote is your voice.</strong> Use it wisely and make a difference.
//                 </Typography>
//                 <Typography variant="body1" color="textPrimary">
//                   Welcome to VoteEase, where casting your vote is simple and secure.
//                   VoteEase ensures that every voice counts, making it easier than ever to participate in shaping our future.
//                 </Typography>
//               </div>
//             </Grid>
//           </Grid>
//         </Container>

//         {userInfo && poll && isPollUpcoming() && userInfo.userType==='voter' &&(
//           <Box sx={pollContainerStyle}>
//             <Typography variant="h5" gutterBottom>
//               Poll Details
//             </Typography>
//             <div style={pollMessageStyle}>
//               <Typography variant="h6">{poll.title}</Typography>
//               <Typography variant="body2">
//                 Start: {new Date(poll.startTime).toLocaleString()}
//               </Typography>
//               <Typography variant="body2">
//                 End: {new Date(poll.endTime).toLocaleString()}
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="small"
//                 onClick={() => navigate('/voter/registerpoll')}
//               >
//                 Register for the Poll
//               </Button>
//             </div>
//           </Box>
//         )}

//         {userInfo && (
//           <div style={buttonContainerStyle}>
//             {userInfo.userType === 'voter' && (
//               <Button variant="contained" color="#fc036b" onClick={() => handleNavigation('/voterhome')}>
//                 Voter Page
//               </Button>
//             )}
//             {userInfo.userType === 'admin' && (
//               <Button variant="contained" color="#fc036b" onClick={() => handleNavigation('/adminhome')}>
//                 Admin Page
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Grid, ThemeProvider, Typography, Button, createTheme, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import Homepage from '../images/homepage4.webp';
import { UserContext } from './UserContext';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const backgroundStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundImage: `url(${Homepage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
  paddingTop: '20px',
  position: 'relative',
};

const buttonContainerStyle = {
  position: 'absolute',
  bottom: '100px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const pollMessageContainerStyle = {
  position: 'absolute',
  left: '20px',
  bottom: '150px',
  width: '300px',
  height: '200px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column-reverse',
  //border: '1px solid #ccc',
  borderRadius: '8px',
 // backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background over the original background
  padding: '10px',
};

const pollMessageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: 'scrollTop 10s linear infinite', // This is the scroll animation
};

const scrollAnimation = `
  @keyframes scrollTop {
    0% {
      transform: translateY(100%);
    }
    50% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

export default function HomePage() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [isPollClose, setIsPollClose] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/view-poll');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        console.error('Error fetching poll:', error);
      }
    };

    fetchPoll();
  }, []);

  useEffect(() => {
    if (poll) {
      const currentTime = new Date();
      const pollStartTime = new Date(poll.startTime);
      const timeDiff = pollStartTime - currentTime;

      // If poll starts within 5 minutes, disable registration and animation
      if (timeDiff <= 5 * 60 * 1000) {
        setIsPollClose(true);
      } else {
        setIsPollClose(false);
      }
    }
  }, [poll]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isPollUpcoming = () => {
    if (!poll) return false;
    const currentTime = new Date();
    return new Date(poll.startTime) > currentTime;
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <style>{scrollAnimation}</style>
      <div style={backgroundStyle}>
        <Container maxWidth="md">
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" align="center" gutterBottom>
                ONLINE ELECTION PLATFORM
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: 'center' }}>
                <Typography variant="body1" color="textPrimary" style={{ marginBottom: '10px' }}>
                  <strong>Your vote is your voice.</strong> Use it wisely and make a difference.
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Welcome to VoteEase, where casting your vote is simple and secure.
                  VoteEase ensures that every voice counts, making it easier than ever to participate in shaping our future.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>

        {/* Poll Registration Animation */}
        {userInfo && poll && isPollUpcoming() && userInfo.userType === 'voter' && !isPollClose && (
          
          <Box sx={pollMessageContainerStyle}>
            
            <div style={pollMessageStyle}>
            <Typography variant="h6">Up Comming Poll</Typography>
              <Typography variant="h6">{poll.title}</Typography>
              <Typography variant="body2">
                Start: {new Date(poll.startTime).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                End: {new Date(poll.endTime).toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate('/voter/registerpoll')}
              >
                Register for the Poll
              </Button>
            </div>
          </Box>
        )}

        {userInfo && (
          <div style={buttonContainerStyle}>
            {userInfo.userType === 'voter' && (
              <Button variant="contained" color="#fc036b" onClick={() => handleNavigation('/voterhome')}>
                Voter Page
              </Button>
            )}
            {userInfo.userType === 'admin' && (
              <Button variant="contained" color="#fc036b" onClick={() => handleNavigation('/adminhome')}>
                Admin Page
              </Button>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
