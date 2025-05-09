import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "../theme";
import { UserContext } from "../UserContext";

const EditVoterAccount = () => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    voterid: "",
    age: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Populate userData when userInfo is available
  useEffect(() => {
    if (userInfo?.user) {
      setUserData({
        username: userInfo.user.username || "",
        email: userInfo.user.email || "",
        voterid: userInfo?.user.voterid,
        age: userInfo.user.age || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    console.log(userData);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3000/voter-Account-edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update voter account");
      }
      setSuccessMessage("Account details updated successfully!");
      setTimeout(() => navigate("/voterhome"), 2000);
    } catch (error) {
      console.error("Error updating voter account:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Voter Account
          </Typography>
          {successMessage && (
            <Typography color="green" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Email (Non-editable) */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </Grid>

              {/* Username */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </Grid>

              {/* Aadhar Number */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Voter ID"
                  name="aadhar"
                  value={userData.voterid}
                  disabled
                />
              </Grid>

              {/* Age */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditVoterAccount;

