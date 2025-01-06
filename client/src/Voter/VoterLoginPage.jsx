
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const defaultTheme = createTheme();

export default function VoterLoginPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ aadharError: '', passwordError: '' });
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(aadhar, password);

    try {
      const response = await fetch('http://127.0.0.1:3000/voterlogin', {
        method: 'POST',
        body: JSON.stringify({ aadhar, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (!(data.user)) {
        setErrors({
          aadharError: data.errors.aadhar,
          passwordError: data.errors.password
        });
      }
      if (data.user) {
        setUserInfo(data);
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to='/voterhome' />;
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
              Voter Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '90%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="aadhar"
                label="Aadhar Card Number"
                name="aadhar"
                autoComplete="aadhar"
                autoFocus
                value={aadhar}
                onChange={e => setAadhar(e.target.value)}
              />
              <Typography color="error">{errors.aadharError}</Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Typography color="error">{errors.passwordError}</Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container spacing={2}>
                <Grid item marginLeft={'auto'}>
                  <Link href="/votersignup" variant="body2">
                    "Don't have an account? Sign Up"
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