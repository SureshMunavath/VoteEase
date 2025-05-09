// import { useEffect, useState, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Container,
//   CssBaseline,
//   Box,
//   Avatar,
//   Typography,
//   Grid,
//   TextField,
//   Button,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { ThemeProvider } from "@mui/material/styles";
// import defaultTheme from "../theme";
// import { UserContext } from "../UserContext";

// const EditAdminAccount = () => {
//   const { userInfo } = useContext(UserContext);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     EmployeeId: "",
    
//   });

//   const [successMessage, setSuccessMessage] = useState("");

//   // Populate userData when userInfo is available
//   useEffect(() => {
//     if (userInfo?.user) {
//       setUserData({
//         username: userInfo.user.username || "",
//         email: userInfo.user.email || "",
//        EmployeeId: userInfo?.user.EmployeeId,
//       });
//     }
//   }, [userInfo]);

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://127.0.0.1:3000/admin-Account-edit/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update Admin account");
//       }
//       setSuccessMessage("Account details updated successfully!");
//       setTimeout(() => navigate("/adminhome"), 2000);
//     } catch (error) {
//       console.error("Error updating Admin account:", error);
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Edit Admin Account
//           </Typography>
//           {successMessage && (
//             <Typography color="green" sx={{ mt: 2 }}>
//               {successMessage}
//             </Typography>
//           )}
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               {/* Email (Non-editable) */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={userData.email}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               {/* Username */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   name="username"
//                   value={userData.username}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               {/* Aadhar Number */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="EmployeeId"
//                   name="Employee ID"
//                   value={userData.EmployeeId}
//                   onChange={handleChange}
//                   disabled
//                 />
//               </Grid>
 
//             </Grid>

//             {/* Submit Button */}
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Save Changes
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default EditAdminAccount;

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

const EditAdminAccount = () => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    EmployeeId: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message for duplicate email

  // Populate userData when userInfo is available
  useEffect(() => {
    if (userInfo?.user) {
      setUserData({
        username: userInfo.user.username || "",
        email: userInfo.user.email || "",
        EmployeeId: userInfo?.user.EmployeeId,
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error message when user edits the email
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3000/admin-Account-edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.message === "Admin with this Email already exists") {
          setErrorMessage(result.message);
        } else {
          throw new Error("Failed to update Admin account");
        }
        return;
      }

      setSuccessMessage("Account details updated successfully!");
      setTimeout(() => navigate("/adminhome"), 2000);
    } catch (error) {
      console.error("Error updating Admin account:", error);
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
            Edit Admin Account
          </Typography>
          {successMessage && (
            <Typography color="green" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  error={!!errorMessage} // Show error style if errorMessage exists
                  helperText={errorMessage} // Show error message under the field
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

              {/* Employee ID (Disabled) */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Employee ID"
                  name="EmployeeId"
                  value={userData.EmployeeId}
                  onChange={handleChange}
                  disabled
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

export default EditAdminAccount;
