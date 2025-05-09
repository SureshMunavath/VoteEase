
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePoll() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [totalVotes, setTotalVotes] = useState('');
    const [errors, setErrors] = useState({
        titleError: '',
        descriptionError: '',
        startTimeError: '',
        endTimeError: '',
        pollError: '',
        timeError: '',
        totalVotesError: ''
    });
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:3000/create-poll', {
                method: 'POST',
                body: JSON.stringify({ title, description, startTime, endTime, totalVotes }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.status === 401) {
                setErrors({ pollError: 'A poll already exists; a new one cannot be created' });
            } else if (response.status === 402) {
                setErrors({ timeError: 'Enter valid time' });
            } else if (!data.poll) {
                setErrors({
                    titleError: data.errors?.title || '',
                    descriptionError: data.errors?.description || '',
                    startTimeError: data.errors?.startTime || '',
                    endTimeError: data.errors?.endTime || '',
                    totalVotesError: data.errors?.totalVotes || ''
                });
            } else {
                setSuccess(true);
                setTitle('');
                setDescription('');
                setEndTime('');
                setStartTime('');
                setTotalVotes('');
                setRedirect(true);
            }
        } catch (err) {
            console.log("Failed to create poll:", err);
        }
    };

    if (redirect) {
        navigate('/create-contestant');
    }

    return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 4 }}>
//             <Typography
//                 variant="h4"
//                 align="center"
//                 sx={{
//                     color: '#2F4F4F',               // White text color
//                     fontWeight: 'bold',           // Bold text
//                     mb: 4,                        // Margin-bottom for spacing below
//                     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Subtle text shadow for depth
//                     letterSpacing: '2px',         // Spread letters slightly
//                     fontSize: '2.5rem',           // Increase font size
//                     lineHeight: 1.3,              // Adjust line height for better spacing
//                 }}
//                 >
//   Create Poll
// </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={10}>
//                             <TextField
//                                 label="Title"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 required
//                                 error={!!errors.titleError}
//                             />
//                             {!!errors.titleError && (
//                                 <Typography color="error">{errors.titleError}</Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={10}>
//                             <TextField
//                                 label="Description"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 multiline
//                                 rows={4}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                                 error={!!errors.descriptionError || !!errors.timeError}
//                             />
//                             {!!errors.descriptionError && (
//                                 <Typography color="error">{errors.descriptionError}</Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Time"
//                                 type="datetime-local"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 value={startTime}
//                                 onChange={(e) => setStartTime(e.target.value)}
//                                 required
//                                 error={!!errors.startTimeError || !!errors.timeError}
//                             />
//                             {!!errors.startTimeError && (
//                                 <Typography color="error">{errors.startTimeError}</Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Time"
//                                 type="datetime-local"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 value={endTime}
//                                 onChange={(e) => setEndTime(e.target.value)}
//                                 required
//                                 error={!!errors.endTimeError}
//                             />
//                             {!!errors.endTimeError && (
//                                 <Typography color="error">{errors.endTimeError}</Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Total Number of Votes"
//                                 type="number"
//                                 variant="outlined"
//                                 margin="normal"
//                                 InputProps={{ inputProps: { min: 0 } }}
//                                 value={totalVotes}
//                                 onChange={(e) => setTotalVotes(e.target.value)}
//                                 required
//                                 error={!!errors.totalVotesError}
//                             />
//                             {!!errors.totalVotesError && (
//                                 <Typography color="error">{errors.totalVotesError}</Typography>
//                             )}
//                         </Grid>
//                     </Grid>
//                     {success && (
//                         <Typography color="success"><CheckCircleIcon /> Poll created successfully</Typography>
//                     )}
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                     >
//                         Create Poll
//                     </Button>
//                     <Typography color="error">{errors.pollError}</Typography>
//                 </form>
//             </Box>
//         </Container>
<Container maxWidth="sm">
  <Box
    sx={{
      mt: 6,
      p: 4,
      boxShadow: 3,
      borderRadius: 3,
      bgcolor: '#f9f9f9'
    }}
  >
    <Typography
      variant="h4"
      align="center"
      sx={{
        color: '#2F4F4F',
        fontWeight: 'bold',
        mb: 4,
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        letterSpacing: '1px',
      }}
    >
      Create Poll
    </Typography>

    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.titleError}
            helperText={errors.titleError}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.descriptionError}
            helperText={errors.descriptionError}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Start Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            error={!!errors.startTimeError}
            helperText={errors.startTimeError}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="End Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            error={!!errors.endTimeError}
            helperText={errors.endTimeError}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Total Number of Votes"
            type="number"
            variant="outlined"
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
            value={totalVotes}
            onChange={(e) => setTotalVotes(e.target.value)}
            error={!!errors.totalVotesError}
            helperText={errors.totalVotesError}
          />
        </Grid>

        {errors.pollError && (
          <Grid item xs={12}>
            <Typography color="error" align="center">{errors.pollError}</Typography>
          </Grid>
        )}

        {errors.timeError && (
          <Grid item xs={12}>
            <Typography color="error" align="center">{errors.timeError}</Typography>
          </Grid>
        )}

        {success && (
          <Grid item xs={12}>
            <Typography
              color="success.main"
              align="center"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
            >
              <CheckCircleIcon color="success" /> Poll created successfully
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create Poll
          </Button>
        </Grid>
      </Grid>
    </form>
  </Box>
</Container>


    );
}
