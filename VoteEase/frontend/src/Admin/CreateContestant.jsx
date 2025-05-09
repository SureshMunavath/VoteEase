
import React, { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Card, CardContent } from '@mui/material';

const CreateContestant = () => {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errors, setErrors] = useState({ nameError: '', partyError: '', ageError: '', genderError: '', imageError: '' });
  const [success, setSuccess] = useState(false);
  const [pollExists, setPollExists] = useState(null); // Initially null, will be set to true/false

  // Fetch poll data when component mounts
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/view-poll');
        const data = await response.json();
        console.log(data);
        if (!data) {
          setPollExists(false); // No poll exists
        } else {
          setPollExists(true); // Poll exists
        }
      } catch (err) {
        console.error('Error fetching poll:', err);
        setPollExists(false); // If there's an error fetching, assume no poll
      }
    };
    fetchPoll();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'contestants_info');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dw4reriae/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          setImage(data.secure_url);
          setImageUploaded(true);
        }
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3000/create-contestant', {
        method: 'POST',
        body: JSON.stringify({ name, party, age, gender, image }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();

      if (!data.user) {
        setErrors({
          nameError: data.errors.name || '',
          partyError: data.errors.party || '',
          ageError: data.errors.age || '',
          genderError: data.errors.gender || '',
          imageError: data.errors.image || '',
        });
      } else {
        setSuccess(true);
        setName('');
        setParty('');
        setAge('');
        setGender('');
        setImage(null);
        setImageUploaded(false);
        setErrors({ nameError: '', partyError: '', ageError: '', genderError: '', imageError: '' });

        setTimeout(() => setSuccess(false), 3000); // Success message disappears after 3 seconds
      }
    } catch (err) {
      console.error('Failed to create contestant:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: '#2F4F4F',
            fontWeight: 'bold',
            mb: 4,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '2px',
            fontSize: '2.5rem',
            lineHeight: 1.3,
          }}
        >
          Create Contestant
        </Typography>

        {/* Show error message if no poll exists */}
        {pollExists === false && (
          <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                Oops!! No poll has been created
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Render form only if poll exists */}
        {pollExists === true && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.nameError}
                  helperText={errors.nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Party"
                  variant="outlined"
                  fullWidth
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  error={!!errors.partyError}
                  helperText={errors.partyError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  error={!!errors.ageError}
                  helperText={errors.ageError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.genderError}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <Typography color="error">{errors.genderError}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ width: '70%' }}
                  >
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {imageUploaded && (
                    <Typography color="success" sx={{ ml: 2 }}>
                      <CheckCircleIcon sx={{ mr: 1 }} /> Image uploaded successfully
                    </Typography>
                  )}
                </Box>
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.imageError}
                </Typography>
              </Grid>
            </Grid>
            {success && (
              <Typography color="success" sx={{ mt: 2 }}>
                <CheckCircleIcon sx={{ mr: 1 }} /> Contestant created successfully
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create Contestant
            </Button>
          </form>
        )}

        {/* Render a loading state when pollExists is null */}
        {pollExists === null && (
          <Typography align="center" sx={{ mb: 4 }}>
            Loading poll status...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CreateContestant;
