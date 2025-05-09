

// import { Card, CardContent, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import React, { useEffect, useState } from 'react';
// import './result.css';

// export default function ViewContestants() {
//     const [contestants, setContestants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // Fetch contestants on component mount
//     const fetchContestants = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:3000/adminhome/view-results');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch contestants');
//             }
//             const data = await response.json();
//             setContestants(data);
//             setLoading(false);
//         } catch (error) {
//             setError('Error in displaying contestants');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchContestants();
//     }, [contestants]);

//     // Remove contestant handler
//     const handleRemove = async (id) => {
//         try {
//             const response = await fetch(`http://127.0.0.1:3000/adminhome/delete-contestant/${id}`, {
//                 method: 'DELETE',
//             });

//             if (response.ok) {
//                 // Re-fetch the contestants after deletion
//                 fetchContestants();
//             } else {
//                 console.error('Failed to delete contestant');
//             }
//         } catch (error) {
//             console.error('Error deleting contestant:', error);
//         }
//         useEffect(() => {
//             console.log("log")
//             //fetchContestants();
//         }, [contestants]);
//     };

//     if (loading) {
//         return <div><CircularProgress /></div>;
//     }

//     if (error) {
//         return (
//             <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
//                 <CardContent>
//                     <Typography variant="h5" component="div">
//                         Error
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         {error}
//                     </Typography>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <div className='parent'>
//             <h1>Contestants</h1>
//             {contestants.length === 0 ? (
//                 <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
//                     <CardContent>
//                         <Typography variant="h5" component="div">
//                             No Contestants
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             There are no contestants to display at the moment.
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             ) : (
//                 <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '20px auto' }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Photo</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Party Name</TableCell>
//                                 <TableCell>Age</TableCell>
//                                 <TableCell>Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {contestants.map((contestant) => (
//                                 <TableRow key={contestant._id}>
//                                     <TableCell>
//                                         <img 
//                                             src={contestant.image} 
//                                             alt={`${contestant.name}'s photo`} 
//                                             style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' }} 
//                                         />
//                                     </TableCell>
//                                     <TableCell>{contestant.name}</TableCell>
//                                     <TableCell>{contestant.party}</TableCell>
//                                     <TableCell>{contestant.age}</TableCell>
//                                     <TableCell>
//                                         <IconButton
//                                             color="error"
//                                             onClick={() => handleRemove(contestant._id)}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </div>
//     );
// }

import {
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import React, { useEffect, useState } from 'react';
  import './result.css';
  
  export default function ViewContestants() {
    const [contestants, setContestants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    // Fetch contestants
    const fetchContestants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/adminhome/view-results');
        if (!response.ok) {
          throw new Error('Failed to fetch contestants');
        }
        const data = await response.json();
        setContestants(data);
        setLoading(false);
      } catch (error) {
        setError('Error in displaying contestants');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchContestants();
    }, [contestants]);
  
    // Remove contestant handler
    const handleRemove = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/adminhome/delete-contestant/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Update the contestants state directly to remove the deleted contestant
          setContestants((prevContestants) =>
            prevContestants.filter((contestant) => contestant._id !== id)
          );
        } else {
          console.error('Failed to delete contestant');
        }
      } catch (error) {
        console.error('Error deleting contestant:', error);
      }
    };
  
    if (loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
  
    if (error) {
      return (
        <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Error
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {error}
            </Typography>
          </CardContent>
        </Card>
      );
    }
  
    return (
      <div className="parent">
        <h1>Contestants</h1>
        {contestants.length === 0 ? (
          <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                No Contestants
              </Typography>
              <Typography variant="body2" color="text.secondary">
                There are no contestants to display at the moment.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '20px auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Party Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contestants.map((contestant) => (
                  <TableRow key={contestant._id}>
                    <TableCell>
                      <img
                        src={contestant.image}
                        alt={`${contestant.name}'s photo`}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    </TableCell>
                    <TableCell>{contestant.name}</TableCell>
                    <TableCell>{contestant.party}</TableCell>
                    <TableCell>{contestant.age}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleRemove(contestant._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    );
  }
  
  
  


