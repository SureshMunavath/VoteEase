
// import {
//   Box,
//     Button,
//     Card,
//     CardActions,
//     CardContent,
//     CardHeader,
//     Chip,
//     CircularProgress,
//     Grid,
//     Typography,
// } from '@mui/material';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext'; // Import the UserContext to access userInfo
  
//   export default function ViewPoll() {
//     const [poll, setPoll] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [remainingTime, setRemainingTime] = useState(null); // Add remaining time state
//     const { userInfo } = useContext(UserContext); // Get userInfo from UserContext
//     const navigate = useNavigate();
  
//     const fetchPoll = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/view-poll');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         if (data.errors && data.errors === 'No poll has been created') {
//           setPoll(null); // Set poll to null explicitly
//         } else {
//           setPoll(data);
//           updateRemainingTime(data.startTime); // Set the initial remaining time
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };
  
//     // Function to calculate and update remaining time until the poll starts
//     const updateRemainingTime = (startTime) => {
//       const now = new Date();
//       const start = new Date(startTime);
//       const timeDiff = start - now; // Get the time difference in milliseconds
  
//       if (timeDiff > 0) {
//         // Poll hasn't started, calculate hours, minutes, and seconds
//         const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
//         setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
//       } else {
//         setRemainingTime(null); // Poll has started, no need for countdown
//       }
//     };
  
//     useEffect(() => {
//       fetchPoll();
  
//       // Update remaining time every second
//       const interval = setInterval(() => {
//         if (poll && new Date(poll.startTime) > new Date()) {
//           updateRemainingTime(poll.startTime);
//         }
//       }, 1000);
  
//       return () => clearInterval(interval); // Clean up the interval on component unmount
//     }, [poll]);
  
//     const handleDeletePollClick = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:3000/delete-poll/${poll?._id}`, {
//           method: 'DELETE',
//         });
        
//         const data = await response.json(); // Fetch response data after delete request
//         if (data.errors && data.errors === 'No poll has been created') {
//           setPoll(null);
//         }
  
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
        
//         // Clear the poll data after deletion
//         setPoll(null);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to delete the poll');
//       }
//     };
  
//     const handleViewResultsClick = () => {
//       navigate('/adminhome/view-results');
//     };
  
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//           <CircularProgress />
//         </Box>
//       );
//     }
  
//     if (error) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//           <Typography variant="h6" color="error">
//             {error}
//           </Typography>
//         </Box>
//       );
//     }
  
//     if (!poll || Object.keys(poll).length === 0) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//           <Typography variant="h6">No polls exist</Typography>
//         </Box>
//       );
//     }
  
//     const now = new Date();
//     const pollStartTime = new Date(poll.startTime);
//     const pollEndTime = new Date(poll.endTime);
//     const hasPollStarted = pollStartTime <= now;
//     const hasPollEnded = pollEndTime < now;
  
//     return (
//       <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" padding={2}>
//         <Card sx={{ maxWidth: 600, width: '100%', marginBottom: 2 }}>
//           <CardHeader
//             title={<Chip label={poll.title} color="primary" />}
//           />
//           <CardContent>
//             <Typography variant="body1" gutterBottom>
//               {poll.description}
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Chip label={`Start Time: ${new Date(poll.startTime).toLocaleString()}`} size="small" />
//               </Grid>
//               <Grid item xs={6}>
//                 <Chip label={`End Time: ${new Date(poll.endTime).toLocaleString()}`} size="small" />
//               </Grid>
//               <Grid item xs={6}>
//                 <Chip
//                   label={
//                     hasPollEnded
//                       ? 'Ended'
//                       : hasPollStarted
//                       ? 'Active'
//                       : `Starts in: ${remainingTime || 'soon'}`
//                   }
//                   size="small"
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//           <CardActions>
//             {hasPollEnded && (
//               <Button variant="contained" color="primary" onClick={handleViewResultsClick}>
//                 View Results
//               </Button>
//             )}
//             {userInfo?.userType === 'admin' && (
//               <Button variant="contained" color="error" onClick={handleDeletePollClick}>
//                 Delete Poll
//               </Button>
//             )}
//           </CardActions>
//         </Card>
//       </Box>
//     );
//   }
  

// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Chip,
//   CircularProgress,
//   Grid,
//   Typography,
// } from '@mui/material';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext'; // Import the UserContext to access userInfo

// export default function ViewPoll() {
//   const [poll, setPoll] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [remainingTime, setRemainingTime] = useState(null); // Add remaining time state
//   const { userInfo } = useContext(UserContext); // Get userInfo from UserContext
//   const navigate = useNavigate();

//   const fetchPoll = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/view-poll');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       if (data.errors && data.errors === 'No poll has been created') {
//         setPoll(null); // Set poll to null explicitly
//       } else {
//         setPoll(data);
//         updateRemainingTime(data.endTime); // Set the initial remaining time
//       }
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const updateRemainingTime = (endTime) => {
//     const now = new Date();
//     const end = new Date(endTime);
//     const timeDiff = end - now;

//     if (timeDiff > 0) {
//       const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
//       setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
//     } else {
//       setRemainingTime(null);
//     }
//   };

//   useEffect(() => {
//     fetchPoll();

//     const interval = setInterval(() => {
//       if (poll && new Date(poll.endTime) > new Date()) {
//         updateRemainingTime(poll.endTime);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [poll]);

//   const handleDeletePollClick = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:3000/delete-poll/${poll?._id}`, {
//         method: 'DELETE',
//       });

//       const data = await response.json();
//       if (data.errors && data.errors === 'No poll has been created') {
//         setPoll(null);
//       }

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       setPoll(null);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to delete the poll');
//     }
//   };

//   const handleViewResultsClick = () => {
//     navigate('/adminhome/view-results');
//   };

//   const handleViewContestantsClick = () => {
//     navigate('/adminhome/view-poll/viewcontestants');
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   if (!poll || Object.keys(poll).length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <Typography variant="h6">No polls exist</Typography>
//       </Box>
//     );
//   }

//   const now = new Date();
//   const pollEndTime = new Date(poll.endTime);
//   const hasPollEnded = pollEndTime < now;

//   return (
//     <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" padding={2}>
//       <Card sx={{ maxWidth: 600, width: '100%', marginBottom: 2 }}>
//         <CardHeader title={<Chip label={poll.title} color="primary" />} />
//         {/* <CardContent>
//           <Typography variant="body1" gutterBottom>
//             {poll.description}
//           </Typography>
         
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Chip label={`Start Time: ${new Date(poll.startTime).toLocaleString()}`} size="small" />
//             </Grid>
//             <Grid item xs={6}>
//               <Chip label={`End Time: ${new Date(poll.endTime).toLocaleString()}`} size="small" />
//             </Grid>
//             Total votes:
//           <Typography variant="body1" gutterBottom>
//             {poll.totalVotes}
//           </Typography>
//             <Grid item xs={6}>
//               <Chip
//                 label={hasPollEnded ? 'Ended' : remainingTime || 'Active'}
//                 size="small"
//               />
//             </Grid>
//           </Grid>
          
//         </CardContent> */}
//         <CardContent>
//   <Grid container direction="column" spacing={2}>
//     <Grid item>
//       <Typography variant="body1">
//         <strong>Poll Description:</strong> {poll.description}
//       </Typography>
//     </Grid>
//     <Grid item>
//       <Typography variant="body1">
//         <strong>Start Time:</strong> {new Date(poll.startTime).toLocaleString()}
//       </Typography>
//     </Grid>
//     <Grid item>
//       <Typography variant="body1">
//         <strong>End Time:</strong> {new Date(poll.endTime).toLocaleString()}
//       </Typography>
//     </Grid>
//     <Grid item>
//       <Typography variant="body1">
//         <strong>Total Votes:</strong> {poll.totalVotes}
//       </Typography>
//     </Grid>
//     <Grid item>
//       <Typography variant="body1">
//         <strong>Poll Ends In:</strong> {remainingTime || (hasPollEnded ? 'Ended' : 'Active')}
//       </Typography>
//     </Grid>
//   </Grid>
// </CardContent>

//         <CardActions>
//           {hasPollEnded ? (
//             <Button variant="contained" color="primary" onClick={handleViewResultsClick}>
//               View Results
//             </Button>
//           ) : (
//             <Typography variant="body2" color="textSecondary">
             
//             </Typography>
//           )}
//           {userInfo.userType === 'admin' && hasPollEnded && (
//             <Button variant="contained" color="error" onClick={handleDeletePollClick}>
//               Delete Poll
//             </Button>
//           )}
//           {userInfo.userType === 'admin' && (
//             <Button variant="contained" color="secondary" onClick={handleViewContestantsClick}>
//               View Contestants
//             </Button>
//           )}
//         </CardActions>
//       </Card>
//     </Box>
//   );
// }


import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function ViewPoll() {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch poll data
  const fetchPoll = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/view-poll');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.errors && data.errors === 'No poll has been created') {
        setPoll(null);
      } else {
        setPoll(data);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Update remaining time
  const updateRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const timeDiff = end - now;

    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      const newTime = `${hours}h ${minutes}m ${seconds}s`;
      if (newTime !== remainingTime) setRemainingTime(newTime);
    } else {
      setRemainingTime(null);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  useEffect(() => {
    if (!poll || !poll.endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(poll.endTime);

      if (end > now) {
        updateRemainingTime(poll.endTime);
      } else {
        clearInterval(interval);
        setRemainingTime(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [poll?.endTime]);

  const handleVoteCast = async () => {
    // Simulate a successful vote cast
    setSnackbarMessage('Vote Casted Successfully');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeletePollClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/delete-poll/${poll?._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.errors && data.errors === 'No poll has been created') {
        setPoll(null);
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setPoll(null);
    } catch (error) {
      console.error(error);
      setError('Failed to delete the poll');
    }
  };

  const handleViewResultsClick = () => {
    navigate('/adminhome/view-results');
  };

  const handleViewContestantsClick = () => {
    navigate('/adminhome/view-poll/viewcontestants');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!poll || Object.keys(poll).length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">No polls exist</Typography>
      </Box>
    );
  }

  const now = new Date();
  const pollEndTime = new Date(poll.endTime);
  const pollStartTime = new Date(poll.startTime);
  const hasPollEnded = pollEndTime < now;
  const hasNotStarted = pollStartTime > now;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" padding={2}>
      <Card sx={{ maxWidth: 600, width: '100%', marginBottom: 2 }}>
        <CardHeader title={<Chip label={poll.title} color="primary" />} />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="body1">
                <strong>Poll Description:</strong> {poll.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <strong>Total Votes:</strong> {poll.totalVotes}
              </Typography>
              <Typography variant="body1">
                <strong>Votes Casted:</strong> {poll.voters.length}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <strong>Poll Status:</strong> {hasPollEnded ? 'Ended' : (hasNotStarted ? 'Not Started' : 'Active')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <strong>Poll Ends In:</strong> {remainingTime || (hasPollEnded ? 'Ended' : 'Active')}
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={`Start Time: ${new Date(poll.startTime).toLocaleString()}`} size="small" />
            </Grid>
            <Grid item>
              <Chip label={`End Time: ${new Date(poll.endTime).toLocaleString()}`} size="small" />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {hasPollEnded ? (
            <Button variant="contained" color="primary" onClick={handleViewResultsClick}>
              View Results
            </Button>
          ) : null}
          {userInfo.userType === 'admin' && (
            <Button variant="contained" color="error" onClick={handleDeletePollClick}>
              Delete Poll
            </Button>
          )}
          {userInfo.userType === 'admin' && (
            <Button variant="contained" color="secondary" onClick={handleViewContestantsClick}>
              View Contestants
            </Button>
          )}
        </CardActions>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

