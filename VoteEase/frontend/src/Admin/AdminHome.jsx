
// import { Box, Grid, Typography } from '@mui/material';
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import { Poll, People, BarChart, Info, Sync } from '@mui/icons-material';
// import AHP from "/images/AHP.webp";

// export default function AdminHome() {
//   const { userInfo } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleNavigation = (path) => {
//     if (userInfo) {
//       navigate(path);
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   const features = [
//     { label: 'Create Poll', icon: <Poll fontSize="large" />, action: () => handleNavigation('/create-poll'), color: '#4CAF50' },
//     { label: 'Create Contestant', icon: <People fontSize="large" />, action: () => handleNavigation('/create-contestant'), color: '#6C757D' },
//     { label: 'Live Results', icon: <BarChart fontSize="large" />, action: () => handleNavigation('/adminhome/view-results'), color: '#1E88E5' },
//     { label: 'Poll Details', icon: <Info fontSize="large" />, action: () => handleNavigation('/adminhome/view-poll'), color: '#5a03fc' },
//     { label: 'Process Requests', icon: <Sync fontSize="large" />, action: () => handleNavigation('/adminhome/process_requestes'), color: '#009688' },
//   ];

//   return (
//     <Box
//       sx={{
//        // backgroundImage: `url(${AHP})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         paddingTop: 2,
//       }}
//     >
//       {/* Header */}
//       <Typography
//       variant="h4"
//       align="center"
//       sx={{
//         color: '#2F4F4F',               // White text color
//         fontWeight: 'bold',           // Bold text
//         mb: 4,                        // Margin-bottom for spacing below
//         textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Subtle text shadow for depth
//         letterSpacing: '2px',         // Spread letters slightly
//         fontSize: '2.5rem',           // Increase font size
//         lineHeight: 1.3,              // Adjust line height for better spacing
//        }}
//       >
//   Admin Home
// </Typography>


//       {/* Buttons */}
//       <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
//         <Grid container spacing={5} justifyContent="center"> {/* Increased spacing between buttons */}
//           {features.map((feature, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <Box
//                 sx={{
//                   p: 2,
//                   bgcolor: feature.color,
//                   color: 'white',
//                   boxShadow: 3,
//                   borderRadius: 2,
//                   textAlign: 'center',
//                   cursor: 'pointer',
//                   fontSize: "0.875rem",
//                   '&:hover': { opacity: 0.85 },
//                 }}
//                 onClick={feature.action}
//               >
//                 {feature.icon}
//                 <Typography variant="h6" mt={1} sx={{ fontSize: "1rem" }}>
//                   {feature.label}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }




import { Box, Grid, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Poll, People, BarChart, Info, Sync, AdminPanelSettings } from '@mui/icons-material';
import AHP from "/images/AHP.webp";

export default function AdminHome() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNavigation = (path) => {
    if (userInfo) {
      navigate(path);
    } else {
      setSnackbarOpen(true);
    }
  };

  const features = [
    { label: 'Create Poll', icon: <Poll fontSize="large" />, action: () => handleNavigation('/create-poll'), color: '#4CAF50' },
    { label: 'Create Contestant', icon: <People fontSize="large" />, action: () => handleNavigation('/create-contestant'), color: '#6C757D' },
    { label: 'Live Results', icon: <BarChart fontSize="large" />, action: () => handleNavigation('/adminhome/view-results'), color: '#1E88E5' },
    { label: 'Poll Details', icon: <Info fontSize="large" />, action: () => handleNavigation('/adminhome/view-poll'), color: '#5a03fc' },
    { label: 'Process Requests', icon: <Sync fontSize="large" />, action: () => handleNavigation('/adminhome/process_requestes'), color: '#009688' },
    { label: 'Create Admin Account', icon: <AdminPanelSettings fontSize="large" />, action: () => handleNavigation('/adminsignup'), color: '#D32F2F' }, // New Button
  ];

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 2,
      }}
    >
      {/* Header */}
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
        Admin Home
      </Typography>

      {/* Buttons */}
      <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <Grid container spacing={5} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: feature.color,
                  color: 'white',
                  boxShadow: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: "0.875rem",
                  '&:hover': { opacity: 0.85 },
                }}
                onClick={feature.action}
              >
                {feature.icon}
                <Typography variant="h6" mt={1} sx={{ fontSize: "1rem" }}>
                  {feature.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}






