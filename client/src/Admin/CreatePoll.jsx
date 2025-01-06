// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// export default function CreatePoll() {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [endTime, setEndTime] = useState('');
//     const [total_votes,setTotal_votes]=useState('');
//     const [errors, setErrors] = useState({ titleError: '', descriptionError: '', startTimeError: '', endTimeError: '',pollerror:'',timeError:'',totalVotesError:''});
//     const [success, setSuccess] = useState(false);
//     const [redirect,setRedirect]=useState(false);
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await fetch('http://127.0.0.1:3000/create-poll', {
//             method: 'POST',
//             body: JSON.stringify({ title,description, startTime,endTime}),
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include'
//           })
//           const data = await response.json();
//           if(response.status==401)
//             {
//                 setErrors({pollError:'A Poll is already exist new cannot be created'});
//             }
//           if(response.status==402)
//             {
//                 setErrors({timeError:'Enter valid time'});
//             }
//           if (!data.poll) {
//             setErrors({
//               titleError: data.errors.title || '',
//               descriptionError: data.errors.description || '',
//               startTimeError: data.errors.startTime || '',
//               endTimeError: data.errors.endTime || '',
//             });
//             console.log("there is an error");
//           }
//           if(data.poll){
//             setSuccess(true);
//             setTitle('');
//             setDescription('');
//             setEndTime('');
//             setStartTime('')
//             setRedirect(true);
//             console.log("poll creation is successful");
//           }
//         }
//         catch (err) {
//           console.log("failed to create poll");
//           console.log(err);
//         }
//       };
//     if (redirect) {
//         navigate('/create-contestant');
//       }
//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 4 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Create Poll
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
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
//                         <Grid item xs={12}>
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
//                                 error={!!errors.descriptionError}
//                             />
//                             {!!errors.descriptionError && (
//                                 <Typography color="error">{errors.descriptionError}</Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Total Number of Votes"
//                                 variant="outlined"
//                                 margin="normal"
//                                 multiline
//                                 rows={4}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                                 error={!!errors.descriptionError}
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
//                                 error={!!errors.startTimeError}
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
//                         <Typography color="error">{errors.timeError}</Typography>
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
//     );
// }

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
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Poll
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                error={!!errors.titleError}
                            />
                            {!!errors.titleError && (
                                <Typography color="error">{errors.titleError}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                error={!!errors.descriptionError || !!errors.timeError}
                            />
                            {!!errors.descriptionError && (
                                <Typography color="error">{errors.descriptionError}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Start Time"
                                type="datetime-local"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                error={!!errors.startTimeError || !!errors.timeError}
                            />
                            {!!errors.startTimeError && (
                                <Typography color="error">{errors.startTimeError}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="End Time"
                                type="datetime-local"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                                error={!!errors.endTimeError}
                            />
                            {!!errors.endTimeError && (
                                <Typography color="error">{errors.endTimeError}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Total Number of Votes"
                                type="number"
                                variant="outlined"
                                margin="normal"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={totalVotes}
                                onChange={(e) => setTotalVotes(e.target.value)}
                                required
                                error={!!errors.totalVotesError}
                            />
                            {!!errors.totalVotesError && (
                                <Typography color="error">{errors.totalVotesError}</Typography>
                            )}
                        </Grid>
                    </Grid>
                    {success && (
                        <Typography color="success"><CheckCircleIcon /> Poll created successfully</Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Create Poll
                    </Button>
                    <Typography color="error">{errors.pollError}</Typography>
                </form>
            </Box>
        </Container>
    );
}
