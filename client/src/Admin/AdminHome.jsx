
import { Box, Button, Container, Snackbar, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Adminhome from "../../images/Adminhome.webp"
//import AdminHeader from './AdminHeader';

export default function AdminHome() {
  const { userInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreatePollClick = () => {
    if (userInfo) {
      navigate('/create-poll');
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleCreateContestantClick = () => {
    if (userInfo) {
      navigate('/create-contestant');
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleViewResultsClick = () => {
    if (userInfo) {
      navigate('/adminhome/view-results');
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleViewPollClick = () => {
    if (userInfo) {
      navigate('/adminhome/view-poll');
    } else {
      setSnackbarOpen(true);
    }
  };
  const handleProcessRequestsClick=()=>
  {
      console.log('request processing'); 
  }

  return (
    <Container>
      {/* <AdminHeader/> */}
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Home
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePollClick}
            >
              Create Poll
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateContestantClick}
            >
              Create Contestant
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleViewResultsClick}
            >
              View Results
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleViewPollClick}
            >
              Poll Details
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleProcessRequestsClick}
            >
              Process Requests
            </Button>
          </Stack>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Please login to access"
        action={
          <Button color="inherit" size="small" onClick={() => navigate('/adminlogin')}>
            Login
          </Button>
        }
      />
    </Container>
  );
}
// import { Box, Button, Container, Snackbar, Stack, Typography } from '@mui/material';
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import Adminhome from "../../images/Adminhome.webp";

// export default function AdminHome() {
//   const { userInfo } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCreatePollClick = () => {
//     if (userInfo) {
//       navigate('/create-poll');
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCreateContestantClick = () => {
//     if (userInfo) {
//       navigate('/create-contestant');
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   const handleViewResultsClick = () => {
//     if (userInfo) {
//       navigate('/adminhome/view-results');
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   const handleViewPollClick = () => {
//     if (userInfo) {
//       navigate('/adminhome/view-poll');
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Container
//       sx={{
//         backgroundImage: `url(${Adminhome})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 4
//       }}
//     >
//       <Container maxWidth="sm" sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 3 }}>
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Admin Home
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="center">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreatePollClick}
//             >
//               Create Poll
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleCreateContestantClick}
//             >
//               Create Contestant
//             </Button>
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleViewResultsClick}
//             >
//               View Results
//             </Button>
//             <Button
//               variant="contained"
//               color="info"
//               onClick={handleViewPollClick}
//             >
//               Poll Details
//             </Button>
//           </Stack>
//         </Box>
//       </Container>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message="Please login to access"
//         action={
//           <Button color="inherit" size="small" onClick={() => navigate('/adminlogin')}>
//             Login
//           </Button>
//         }
//       />
//     </Container>
//   );
// }
