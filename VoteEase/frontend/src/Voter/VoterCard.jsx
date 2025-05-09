
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,IconButton,Avatar,Box } from "@mui/material";
import { styled } from "@mui/system";
import { UserContext } from "../UserContext";

const StyledCard = styled(Card)({
  maxWidth: 300,
  margin: "20px",
  padding: "10px",
  position: "absolute",
  top: "80px",
  right: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  zIndex: 999,
});

const Header = styled("div")({
  backgroundColor: "#3f51b5",
  color: "#fff",
  padding: "8px 0",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  textAlign: "center",
});

const DetailContainer = styled("div")({
  padding: "10px 15px",
  textAlign: "left",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "15px",
});

const StyledButton = styled(Button)({
  fontSize: "0.8rem",
  padding: "5px 10px",
  textTransform: "none",
});

const VoterCard = ({ userInfo }) => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  // Navigate to edit account page
  const handleEdit = () => {
    if (userInfo?.userType=== 'voter') {
      navigate(`/voter/edit-account/${userInfo?.user._id}`);
    } else {
      navigate(`/admin/edit-account/${userInfo?.user._id}`);
    }
    
    }

  // Confirm Delete
  const handleDelete = () => {
    setOpenDialog(true);
  };

  // API Call to Delete User
  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/voter-delete-account/${userInfo.user._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      alert("Account deleted successfully!");
      setUserInfo(null);
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
const CalculateAge=(dob)=>
{
  const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
}
  return (
    // <StyledCard>
    //   <Header>
    //     <Typography variant="subtitle1">
    //       {userInfo.userType === "admin" ? "Admin Details" : "Voter Details"}
    //     </Typography>
    //   </Header>


    //   <IconButton edge="end" color="inherit">
    //     <Avatar
    //       src={userInfo.user.adminImage}
    //       alt="User Avatar"
    //       sx={{ width: 40, height: 40 }}
    //     />
    //   </IconButton>

    //   <CardContent>
    //     <DetailContainer>
    //       <Typography variant="body1">Name: {userInfo.user.username}</Typography>
    //       {userInfo.userType === "admin" ? (
    //         <Typography variant="body1">Employee ID: {userInfo.user.EmployeeId}</Typography>
    //       ) : (
    //         <>
    //           <Typography variant="body1">Voter ID Number: {userInfo.user.voterid}</Typography>
    //           <Typography variant="body1">Age: {CalculateAge(userInfo.user.dob)}</Typography>
    //         </>
    //       )}
    //       <Typography variant="body1">Email: {userInfo.user.email}</Typography>
    //     </DetailContainer>
    //     <ButtonContainer>
    //       <StyledButton variant="contained" onClick={handleEdit} color="primary">Edit Account</StyledButton>
    //       <StyledButton variant="contained" onClick={handleDelete} color="error">Delete Account</StyledButton>
    //     </ButtonContainer>
    //   </CardContent>
    //   {/* Confirmation Dialog */}
    //   <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    //     <DialogTitle>Confirm Deletion</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>
    //         Are you sure you want to delete this account? This action cannot be undone.
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
    //       <Button onClick={confirmDelete} color="error">Yes, Delete</Button>
    //     </DialogActions>
    //   </Dialog>
    // </StyledCard>


    <StyledCard>
  <Header>
    <Typography variant="subtitle1">
      {userInfo.userType === "admin" ? "Admin Details" : "Voter Details"}
    </Typography>
  </Header>

  {/* Centered Avatar */}
  <Box display="flex" justifyContent="center" mt={2}>
    <IconButton edge="end" color="inherit">
      <Avatar
          src={
          userInfo.userType === 'admin'
          ? userInfo.user.adminImage
         :userInfo.user.voterImage
          }
          alt="User Avatar"
         sx={{ width: 40, height: 40 }}
       />
    </IconButton>
  </Box>

  <CardContent>
    <DetailContainer>
      <Typography variant="body1">Name: {userInfo.user.username}</Typography>
      {userInfo.userType === "admin" ? (
        <Typography variant="body1">Employee ID: {userInfo.user.EmployeeId}</Typography>
      ) : (
        <>
          <Typography variant="body1">Voter ID Number: {userInfo.user.voterid}</Typography>
          <Typography variant="body1">Age: {CalculateAge(userInfo.user.dob)}</Typography>
        </>
      )}
      <Typography variant="body1">Email: {userInfo.user.email}</Typography>
    </DetailContainer>

    <ButtonContainer>
      <StyledButton variant="contained" onClick={handleEdit} color="primary">
        Edit Account
      </StyledButton>
      <StyledButton variant="contained" onClick={handleDelete} color="error">
        Delete Account
      </StyledButton>
    </ButtonContainer>
  </CardContent>

  {/* Confirmation Dialog */}
  <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this account? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
      <Button onClick={confirmDelete} color="error">Yes, Delete</Button>
    </DialogActions>
  </Dialog>
</StyledCard>

  );
};

export default VoterCard;









