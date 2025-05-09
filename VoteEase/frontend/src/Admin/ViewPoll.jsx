


// //THIS IS THE ORIGINAL FILE
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
//   Snackbar,
//   Alert,
//   Typography,
// } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';

// export default function ViewPoll() {
//   const [poll, setPoll] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [remainingTime, setRemainingTime] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [canVote, setCanVote] = useState(false);
//   const { userInfo } = useContext(UserContext);
//   const navigate = useNavigate();

//   // Fetch poll data
//   const fetchPoll = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/view-poll');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       if (data.errors && data.errors === 'No poll has been created') {
//         setPoll(null);
//       } else {
//         setPoll(data);
//         console.log('Fetched Poll Data:', data);

//         // Ensure comparison works correctly by converting all IDs to strings
//         const currentUserVoterid = String(userInfo.user.voterid);
//         const isUserRegistered = data.registered.map(String).includes(currentUserVoterid);

//         console.log('Current User Voterid:', currentUserVoterid);
//         console.log('Registered Array:', data.registered);
//         console.log('User Registered:', isUserRegistered);

//         setCanVote(isUserRegistered);
//       }
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   // Update remaining time based on start or end time
//   const updateRemainingTime = (time) => {
//     const now = new Date();
//     const targetTime = new Date(time);
//     const timeDiff = targetTime - now;

//     if (timeDiff > 0) {
//       const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
//       const newTime = `${hours}h ${minutes}m ${seconds}s`;
//       if (newTime !== remainingTime) setRemainingTime(newTime);
//     } else {
//       setRemainingTime('Started / Ended');
//     }
//   };

//   useEffect(() => {
//     fetchPoll();
//   }, []);

//   useEffect(() => {
//     if (!poll) return;

//     const interval = setInterval(() => {
//       const now = new Date();
//       const pollStartTime = new Date(poll.startTime);
//       const pollEndTime = new Date(poll.endTime);

//       if (pollStartTime > now) {
//         updateRemainingTime(poll.startTime);
//       } else if (pollEndTime > now) {
//         updateRemainingTime(poll.endTime);
//       } else {
//         clearInterval(interval);
//         setRemainingTime('Ended');
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [poll]);

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

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

//   const handleRegisterPollClick = () => {
//     navigate('/voter/registerpoll');
//   };

//   const handleCasteVoteClick = () => {
//     navigate('/voter/votingpage');
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
//       <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
//       <CardContent>
         
//           <Typography variant="h5" color="text.secondary">
//           Oops!! No poll has been created
//           </Typography>
//       </CardContent>
//   </Card>
//     );
//   }

//   if (!poll || Object.keys(poll).length === 0) {
//     return (
//       <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
//       <CardContent>
         
//           <Typography variant="h5" color="text.secondary">
//           Oops!! No poll has been created
//           </Typography>
//       </CardContent>
//   </Card>
//     );
//   }

//   const now = new Date();
//   const pollEndTime = new Date(poll.endTime);
//   const pollStartTime = new Date(poll.startTime);
//   const hasPollEnded = pollEndTime < now;
//   const hasNotStarted = pollStartTime > now;
//   const fiveMinutesBeforeStart = new Date(pollStartTime).getTime() - 2 * 60 * 1000;
//   const regTime = Date.now() < fiveMinutesBeforeStart;


//   return (
//     <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" padding={2}>
//        <Typography
//       variant="h4"
//       align="center"
//       sx={{
//         color: '#2F4F4F',               // White text color
//         fontWeight: 'bold',           // Bold text
//         mb: 4,                        // Margin-bottom for spacing below
//         textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Subtle text shadow for depth
//         letterSpacing: '2px',         // Spread letters slightly
//         fontSize: '2.5rem',           // Increase font size
//         lineHeight: 1.3,              // Adjust line height for better spacing
//        }}
//       >
//   Poll details
// </Typography>
//       <Card sx={{ maxWidth: 600, width: '100%', marginBottom: 2 }}>
//         <CardHeader title={<Chip label={poll.title} color="primary" />} />
//         <CardContent>
//           <Grid container direction="column" spacing={2}>
//             <Grid item>
//               <Typography variant="body1">
//                 <strong>Poll Description:</strong> {poll.description}
//               </Typography>
//             </Grid>
//             {userInfo.userType === 'admin' && (
//               <Grid item>
//                 <Typography variant="body1">
//                   <strong>Total Votes:</strong> {poll.totalVotes}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Votes Casted:</strong> {poll.voters.length}
//                 </Typography>
//               </Grid>
//             )}
//             <Grid item>
//               <Typography variant="body1">
//                 <strong>Poll Status:</strong> {hasPollEnded ? 'Ended' : hasNotStarted ? 'Not Started' : 'Active'}
//               </Typography>
//             </Grid>
//             {hasNotStarted && (
//               <Grid item>
//                 <Typography variant="body1">
//                   <strong>Poll Starts In:</strong> {remainingTime || 'Not yet started'}
//                 </Typography>
//               </Grid>
//             )}
//             {!hasPollEnded && !hasNotStarted && (
//               <Grid item>
//                 <Typography variant="body1">
//                   <strong>Poll Ends In:</strong> {remainingTime || 'Ended'}
//                 </Typography>
//               </Grid>
//             )}
//             <Grid item>
//               <Chip label={`Start Time: ${new Date(poll.startTime).toLocaleString()}`} size="small" />
//             </Grid>
//             <Grid item>
//               <Chip label={`End Time: ${new Date(poll.endTime).toLocaleString()}`} size="small" />
//             </Grid>
//           </Grid>
//         </CardContent>
//         <CardActions>
//           {userInfo.userType === 'voter' && hasNotStarted && regTime && (
//             <Button variant="contained" color="primary" onClick={handleRegisterPollClick}>
//               Register for Poll
//             </Button>
//           )}
//           {userInfo.userType === 'voter' && !hasNotStarted && !hasPollEnded && canVote && (
//             <Button variant="contained" color="primary" onClick={handleCasteVoteClick}>
//               Cast Vote
//             </Button>
//           )}
//           {hasPollEnded && (
//             <Button variant="contained" color="primary" onClick={handleViewResultsClick}>
//               View Results
//             </Button>
//           )}
//           {userInfo.userType === 'admin' && (
//             <>
//               <Button variant="contained" color="error" onClick={handleDeletePollClick}>
//                 Delete Poll
//               </Button>
//               <Button variant="contained" color="secondary" onClick={handleViewContestantsClick}>
//                 View Contestants
//               </Button>
//             </>
//           )}
//         </CardActions>
//       </Card>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function ViewPoll() {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [canVote, setCanVote] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPoll = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/view-poll');
      if (!response.ok) throw new Error('Failed to fetch poll');

      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        setPoll(null);
      } else {
        setPoll(data);

        const currentUserVoterid = String(userInfo.user.voterid);
        const isUserRegistered = data.registered?.map(String).includes(currentUserVoterid);
        setCanVote(isUserRegistered);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  useEffect(() => {
    if (!poll) return;

    const interval = setInterval(() => {
      const now = new Date();
      const pollStartTime = new Date(poll.startTime);
      const pollEndTime = new Date(poll.endTime);

      if (pollStartTime > now) {
        updateRemainingTime(poll.startTime);
      } else if (pollEndTime > now) {
        updateRemainingTime(poll.endTime);
      } else {
        clearInterval(interval);
        setRemainingTime('Ended');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [poll]);

  // const updateRemainingTime = (time) => {
  //   const now = new Date();
  //   const target = new Date(time);
  //   const diff = target - now;

  //   if (diff > 0) {
  //     const hours = Math.floor(diff / (1000 * 60 * 60));
  //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  //     setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
  //   } else {
  //     setRemainingTime('Started / Ended');
  //   }
  // };
  const updateRemainingTime = (time) => {
    const now = Date.now(); // current time in ms
    const target = new Date(time).getTime(); // poll time in ms (already UTC)
  
    const diff = target - now;
  
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setRemainingTime('Started / Ended');
    }
  };
  
  

  const handleDeletePollClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/delete-poll/${poll?._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok || data.errors) {
        throw new Error(data.errors || 'Failed to delete poll');
      }
      setPoll(null);
      setSnackbarMessage('Poll deleted successfully');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const navigateTo = (path) => navigate(path);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !poll) {
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            Oops!! No poll has been created
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const now = new Date();
  const pollStart = new Date(poll.startTime);
  const pollEnd = new Date(poll.endTime);
  const hasEnded = pollEnd < now;
  const notStarted = pollStart > now;
  const allowRegistration = Date.now() < pollStart.getTime() - 2 * 60 * 1000;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" padding={2}>
      <Typography variant="h4" align="center" sx={{ color: '#2F4F4F', fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.5)', letterSpacing: '2px', fontSize: '2.5rem', lineHeight: 1.3 }}>
        Poll details
      </Typography>

      <Card sx={{ maxWidth: 600, width: '100%', mb: 2 }}>
        <CardHeader title={<Chip label={poll.title} color="primary" />} />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item><Typography><strong>Poll Description:</strong> {poll.description}</Typography></Grid>
            {userInfo.userType === 'admin' && (
              <Grid item>
                <Typography><strong>Total Votes:</strong> {poll.totalVotes}</Typography>
                <Typography><strong>Votes Casted:</strong> {poll.voters.length}</Typography>
              </Grid>
            )}
            <Grid item><Typography><strong>Poll Status:</strong> {hasEnded ? 'Ended' : notStarted ? 'Not Started' : 'Active'}</Typography></Grid>
            {notStarted && <Grid item><Typography><strong>Poll Starts In:</strong> {remainingTime || 'Not yet started'}</Typography></Grid>}
            {!hasEnded && !notStarted && <Grid item><Typography><strong>Poll Ends In:</strong> {remainingTime || 'Ended'}</Typography></Grid>}
            <Grid item><Chip label={`Start Time: ${pollStart.toLocaleString()}`} size="small" /></Grid>
            <Grid item><Chip label={`End Time: ${pollEnd.toLocaleString()}`} size="small" /></Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {userInfo.userType === 'voter' && notStarted && allowRegistration && (
            <Button variant="contained" onClick={() => navigateTo('/voter/registerpoll')}>Register for Poll</Button>
          )}
          {userInfo.userType === 'voter' && !notStarted && !hasEnded && canVote && (
            <Button variant="contained" onClick={() => navigateTo('/voter/votingpage')}>Cast Vote</Button>
          )}
          {hasEnded && (
            <Button variant="contained" onClick={() => navigateTo('/adminhome/view-results')}>View Results</Button>
          )}
          {userInfo.userType === 'admin' && (
            <>
              <Button variant="contained" color="error" onClick={handleDeletePollClick}>Delete Poll</Button>
              <Button variant="contained" color="secondary" onClick={() => navigateTo('/adminhome/view-poll/viewcontestants')}>View Contestants</Button>
            </>
          )}
        </CardActions>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}



