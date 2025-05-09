import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material';
  import React, { useContext, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { UserContext } from '../UserContext';
  
  export default function VotingPage() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [candidates, setCandidates] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pollExists, setPollExists] = useState(false);
    const [pollEnded, setPollEnded] = useState(false);
    const [pollNotStarted, setPollNotStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState(''); // New state for dynamic dialog message
  
    useEffect(() => {
      const fetchPollStatus = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3000/view-poll');
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch poll status. Status: ${response.status}, Response: ${errorText}`);
          }
          const poll = await response.json();
          if (poll && Object.keys(poll).length > 0) {
            setPollExists(true);
  
            const currentTime = new Date();
            const startTime = new Date(poll.startTime);
            const endTime = new Date(poll.endTime);
  
            if (endTime < currentTime) {
              setPollEnded(true);
            } else if (startTime > currentTime) {
              setPollNotStarted(true);
              calculateTimeRemaining(startTime);
            } else {
              fetchContestants();
              if (userInfo) {
                checkHasVoted();
              }
            }
          } else {
            setPollExists(false);
          }
        } catch (error) {
          console.error('Error fetching poll status:', error);
          setError('Error fetching poll status.');
        } finally {
          setLoading(false);
        }
      };
  
      const fetchContestants = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3000/adminhome/view-results');
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch contestants. Status: ${response.status}, Response: ${errorText}`);
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setCandidates(data);
          } else {
            throw new Error('Contestant data format is invalid. Expected an array.');
          }
        } catch (error) {
          console.error('Error fetching contestants:', error);
          setPollExists(false);
        }
      };
  
      const checkHasVoted = async () => {
        if (userInfo) {
          try {
            const voterId = userInfo.user._id;
            const response = await fetch(`http://127.0.0.1:3000/vote_status/${voterId}`);
            if (response.ok) {
              const data = await response.json();
              setHasVoted(data.hasVoted);
            } else if (response.status === 404) {
              setError('Poll not found.');
            } else {
              setHasVoted(false);
            }
          } catch (error) {
            console.error('Error checking vote status:', error);
            setError('Error checking vote status.');
          }
        }
      };
  
      const calculateTimeRemaining = (startTime) => {
        const interval = setInterval(() => {
          const now = new Date();
          const remainingTime = startTime - now;
  
          if (remainingTime <= 0) {
            clearInterval(interval);
            setPollNotStarted(false);
            fetchPollStatus();
          } else {
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);
      };
  
      fetchPollStatus();
    }, [userInfo]);
  
    const handleVoteClick = async (candidateId) => {
      if (!userInfo) {
        setSnackbarMessage('Please log in to cast your vote!');
        setSnackbarOpen(true);
        return;
      }
  
      if (!pollExists) {
        setSnackbarMessage('No poll is available for voting.');
        setSnackbarOpen(true);
        return;
      }
  
      if (hasVoted) {
        setDialogMessage('You have already casted your vote. You cannot vote again in this poll.');
        setDialogOpen(true);
        return;
      }
  
      try {
        const response = await fetch('http://127.0.0.1:3000/cast_vote', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ candidateId, userId: userInfo.user._id }),
        });
  
        if (response.ok) {
          await response.json();
          setHasVoted(true);
          setSnackbarMessage('Vote casted successfully!');
          setSnackbarOpen(true);
        } else {
          const errorText = await response.text();
          if (response.status === 400) {
            setDialogMessage('You have already casted your vote. You cannot vote again in this poll.');
            setDialogOpen(true);
          } else if (response.status === 401) {
            setDialogMessage('The poll has reached its maximum limit. You cannot vote in this poll.');
            setDialogOpen(true);
          } else {
            throw new Error(`Failed to cast vote. Status: ${response.status}, Response: ${errorText}`);
          }
        }
      } catch (error) {
        console.error('Error casting vote:', error);
        setSnackbarMessage('Failed to cast vote.');
        setSnackbarOpen(true);
      }
    };
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    if (loading) {
      return <CircularProgress />;
    }
  
    return (
      <Container>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : !pollExists ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h5" color="black">NO POLLS EXISTS</Typography>
          </Box>
        ) : pollEnded ? (
          <Alert severity="info">The Poll has ended.</Alert>
        ) : pollNotStarted ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h5">Poll starts in {timeRemaining}</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>Candidate Name</TableCell>
                  <TableCell>Party Name</TableCell>
                  <TableCell>Vote</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate._id}>
                    <TableCell>
                      <img
                        src={candidate.image}
                        alt={`${candidate.name}'s photo`}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    </TableCell>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell>{candidate.party}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={hasVoted ? 'error' : 'primary'}
                        onClick={() => handleVoteClick(candidate._id)}
                        disabled={hasVoted}
                      >
                        Vote
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Vote Status</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
  

