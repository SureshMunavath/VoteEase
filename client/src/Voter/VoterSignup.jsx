import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
//import AdminHeader from '../Admin/AdminHeader';
import { UserContext } from '../UserContext';

const defaultTheme = createTheme();

export default function VoterSignupPage() {
  const [username, setUsername] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({ ageError:'', aadharError:'', passwordError:'',usernameError:'' });
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3000/votersignup', {
        method: 'POST',
        body: JSON.stringify({ username, aadhar, password, age }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if(!data.user) {
        setErrors({
          ageError: data.errors.age,
          aadharError: data.errors.aadhar,
          passwordError: data.errors.password,
          usernameError: data.errors.username,
        });
      } else {
        setUserInfo(data);
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to='/voterhome' />
  }

  return (
    <>
    
       <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Voter Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="aadhar"
                    label="Aadhar Number"
                    name="aadhar"
                    autoComplete="aadhar"
                    value={aadhar}
                    onChange={e => setAadhar(e.target.value)}
                    autoFocus
                  />
                  <Typography color="error">{errors.aadharError}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="Name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <Typography color="error">{errors.usernameError}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="age"
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                  <Typography color="error">{errors.ageError}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Typography color="error">{errors.passwordError}</Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/voterlogin" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
