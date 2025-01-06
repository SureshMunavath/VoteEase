import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Voterhome() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const handleViewPollClick = () => {
    console.log(userInfo);
    navigate('/adminhome/view-poll');
  };

  const handleVoteClick = () => {
    navigate('/voter/votingpage');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // full viewport height to center vertically
          flexDirection: 'column', // stack buttons vertically
          gap: 2, // gap between buttons
          paddingTop: '80px', // Adjusted to give gap from the top
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewPollClick}
        >
          Polling Details
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={handleVoteClick}
        >
          Cast Vote
        </Button>
      </Box>
    </>
  );
}





// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import VoterCard from './VoterCard'; // Adjust the import path accordingly

// export default function Voterhome() {
//   const navigate = useNavigate();
//   const { userInfo } = useContext(UserContext);

//   const handleViewPollClick = () => {
//     console.log(userInfo);
//     navigate('/adminhome/view-poll');
//   };

//   const handleVoteClick = () => {
//     navigate('/voter/votingpage');
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           flexDirection: 'column',
//           gap: 2,
//         }}
//       >
//         {userInfo && <VoterCard user={userInfo.user} />}
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleViewPollClick}
//         >
//           Polling Details
//         </Button>
//         <Button
//           variant="contained"
//           color="info"
//           onClick={handleVoteClick}
//         >
//           Cast Vote
//         </Button>
//       </Box>
//     </>
//   );
// }
