// import { Card, CardContent, Typography } from '@mui/material';
// import { styled } from '@mui/system';
// import React from 'react';

// const StyledCard = styled(Card)({
//   maxWidth: 345,
//   margin: '20px auto',
//   padding: '20px',
//   textAlign: 'center',
// });

// const Header = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: '#fff',
//   padding: '10px 0',
// }));

// const VoterCard = ({ user }) => (
//   <StyledCard>
//     <Header>
//       <Typography variant="h5">Hello Voter</Typography>
//     </Header>
//     <CardContent>
//       <Typography variant="h6">Name: {user.name}</Typography>
//       <Typography variant="body1">Aadhar Number: {user.aadhar}</Typography>
//       <Typography variant="body1">Age: {user.age}</Typography>
//     </CardContent>
//   </StyledCard>
// );

// export default VoterCard;


import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const StyledCard = styled(Card)({
  maxWidth: 300, // Reduced the width for a smaller card
  margin: '20px',
  padding: '10px', // Reduced padding for a more compact look
  position: 'absolute',
  top: '80px', // Adjusted to give gap from the header
  right: '20px', // Positioned to the right side
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Lighter shadow for a subtle effect
  borderRadius: '8px', // Slightly reduced border radius
  zIndex: 999, // Ensures it's above other content
});

const Header = styled('div')({
  backgroundColor: '#3f51b5', // primary color (blue)
  color: '#fff',
  padding: '8px 0', // Smaller padding for the header
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  textAlign: 'center',
});

const DetailContainer = styled('div')({
  padding: '10px 15px', // Reduced padding for details
  textAlign: 'left',
});

const VoterCard = ({ userInfo }) => (
  <StyledCard>
    <Header>
      <Typography variant="subtitle1">
        {userInfo.userType === 'admin' ? 'Admin Details' : 'Voter Details'}
      </Typography>
    </Header>
    <CardContent>
      <DetailContainer>
        <Typography variant="body1">Name: {userInfo.user.username}</Typography>
        {userInfo.userType === 'admin' ? (
          <Typography variant="body1">Employee ID: {userInfo.user.EmployeeId}</Typography>
        ) : (
          <>
            <Typography variant="body1">Aadhar Number: {userInfo.user.aadhar}</Typography>
            <Typography variant="body1">Age: {userInfo.user.age}</Typography>
          </>
        )}
      </DetailContainer>
    </CardContent>
  </StyledCard>
);

export default VoterCard;





