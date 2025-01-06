import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';
//import AdminHeader from './AdminHeader';
const defaultTheme = createTheme();
import { UserContext } from '../UserContext'
export default function AdminSignupPage() {
  const [username, setUsername] = useState('');
  const [EmployeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect]=useState(false);
  const [errors,setErrors]=useState({IdError:'',passwordError:'',usernameError:''}) ;
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:3000/adminsignup', {
        method: 'POST',
        body: JSON.stringify({ username,EmployeeId, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      const data = await response.json();

      if (!(data.user)) {
        setErrors({
          IdError:data.errors.EmployeeId,
          passwordError:data.errors.password,
          usernameError:data.errors.username,
        });

      }
      if (data.user) {
        setUserInfo(data);
        setRedirect(true);
      }
    }
    catch (err) {
      console.log(err);
    }
    


  };

  if (redirect) {
    return <Navigate to='/adminhome'/>
  }

  return (
    <>
  
      <ThemeProvider theme={defaultTheme}>
      {/* <AdminHeader/> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border:'1px black'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="EmployeeId"
                    label="Employee ID Number"
                    name="EmployeeId"
                    autoComplete="Employee Id"
                    value={EmployeeId} 
                    onChange={e => setEmployeeId(e.target.value)}
                  />
                  <Typography color="error">{errors.IdError}</Typography>
                  
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
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password} onChange={e => setPassword(e.target.value)}
                   
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
                  <Link href="/adminlogin" variant="body2">
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