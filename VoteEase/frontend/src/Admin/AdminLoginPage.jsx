
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const defaultTheme = createTheme();

export default function AdminLoginPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [EmployeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({ IdError: '', passwordError: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:3000/adminlogin', {
        method: 'POST',
        body: JSON.stringify({ EmployeeId, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (!(data.user)) {
        setErrors({
          IdError: data.errors.EmployeeId,
          passwordError: data.errors.password
        });
      }
      if (data.user) {
        console.log(data.user);
        setUserInfo(data);
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to='/adminhome' />;
  }

  return (
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
            Admin Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '90%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="EmployeeId"
              label="Employee ID Number"
              name="EmployeeId"
              autoComplete="EmployeeId"
              autoFocus
              value={EmployeeId} 
              onChange={e => setEmployeeId(e.target.value)}
            />
            <Typography color="error">{errors.IdError}</Typography>
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
                <Link href="/adminsignup" variant="body2">
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

