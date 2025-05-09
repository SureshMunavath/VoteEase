
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Human_icon from '/images/Human_icon.jpg';


export default function ProcessRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch requests from the server
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (voteridNumber) => {
    console.log(`Accepting request with ID: ${voteridNumber}`);
    try {
      const response = await fetch("http://127.0.0.1:3000/accept_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({
          voteridNumber:voteridNumber,  // Only send the Voter id number to the backend
        }),
      });

      const data = await response.json();  // Parse the JSON response from the backend

      if (response.ok) {
        // If request was successful
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.voteridNumber !== voteridNumber)
        );
        setStatusMessage((prevStatus) => ({
          ...prevStatus,
          [voteridNumber]: { message: "Accepted", color: "green" },
        }));
        // setTimeout(() => {
        //   window.location.reload(); // Refresh the page after 1 second
        // }, 1000); // Refresh after 1 second (1000 ms)
      } else {
        // Handle errors if any
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error("Error while making the API call:", error);
    }
  };

  const handleReject = async (voteridNumber) => {
    console.log(`Rejecting request with ID: ${voteridNumber}`);
    try {
      const response = await fetch("http://127.0.0.1:3000/reject_request", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({
          voteridNumber: voteridNumber,  // Only send the Aadhaar number to the backend
        }),
      });

      const data = await response.json();  // Parse the JSON response from the backend

      if (response.ok) {
        // If request was successful
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.voterImage !== voteridNumber)
        );
        setStatusMessage((prevStatus) => ({
          ...prevStatus,
          [voteridNumber]: { message: "Rejected", color: "red" },
        }));
        // setTimeout(() => {
        //   window.location.reload(); // Refresh the page after 5 seconds
        // }, 5000); // Refresh after 5 seconds (5000 ms)
      } else {
        // Handle errors if any
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error("Error while making the API call:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    navigate("/adminhome/process_requests/view_file", {
      state: { imageUrl }, // Pass the image URL in state
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
       <Typography
  variant="h4"
  align="center"
  sx={{
    color: '#2F4F4F',               // White text color
    fontWeight: 'bold',           // Bold text
    mb: 4,                        // Margin-bottom for spacing below
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Subtle text shadow for depth
    letterSpacing: '2px',         // Spread letters slightly
    fontSize: '2.5rem',           // Increase font size
    lineHeight: 1.3,              // Adjust line height for better spacing
  }}
>
  Registered Candidates
</Typography>
      {requests.length === 0 ? (
         <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
         <CardContent>
            
             <Typography variant="h5" color="text.secondary">
             Oops!! No Requests available.
             </Typography>
         </CardContent>
     </Card>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Photo</strong>
                </TableCell>
                <TableCell>
                  <strong>Voter ID Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Age</strong>
                </TableCell>
                <TableCell>
                  <strong>ID Proof</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>
                    <img
                      src={Human_icon}
                      alt={`${request.name}'s ID Proof`}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(request.voterImage)} // Call the function on click
                    />
                  </TableCell>
                  <TableCell>{request.voteridNumber}</TableCell>
                  <TableCell>{request.age}</TableCell>
                  <TableCell>
                    <img
                      src={request.Idproof}
                      alt={`${request.name}'s ID Proof`}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(request.Idproof)} // Call the function on click
                    />
                  </TableCell>
                  <TableCell align="center">
                    {statusMessage[request.voteridNumber] ? (
                      <Typography style={{ color: statusMessage[request.voteridNumber].color }}>
                        {statusMessage[request.voteridNumber].message}
                      </Typography>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleAccept(request.voteridNumber)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(request.voteridNumber)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

