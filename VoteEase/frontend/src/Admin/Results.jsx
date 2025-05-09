// import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import './result.css';

// export default function Results() {
//     const [contestants, setContestants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchContestants = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:3000/adminhome/view-results');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch posts');
//                 }
//                 const data = await response.json();
//                 if (response.status === 201) {
//                     setError(data.message);
//                 } else {
//                     const sortedContestants = data.sort((a, b) => b.voteCount - a.voteCount);
//                     setContestants(sortedContestants);
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 setError('Error in displaying results');
//                 setLoading(false);
//             }
//         };

//         fetchContestants();
//     }, []);

//     if (loading) {
//         return <div><CircularProgress /></div>;
//     }

//     if (error) {
//         return (
//             <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
//                 <CardContent>
                   
//                     <Typography variant="h5" color="text.secondary">
//                     Oops!! No poll has been created
//                     </Typography>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <div className='parent'>
          
//             {contestants.length === 0 ? (
//                 <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
//                     <CardContent>
//                         <Typography variant="h5" component="div">
//                             No Contestants Exist
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             There are no Contestants exist to display at the moment.
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Photo</th>
//                             <th>Name of the Candidate</th>
//                             <th>Party Name</th>
//                             <th>Vote Count</th>
                            
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {contestants.map(contestant => (
//                             <tr key={contestant._id}>
//                                 <td><img 
//                     src={contestant.image} 
//                     alt={`${contestant.name}'s photo`} 
//                     style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' }} 
//                 /></td>
//                                 <td>{contestant.name}</td>
//                                 <td>{contestant.party}</td>
//                                 <td>{contestant.voteCount}</td>
                                
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }



import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './result.css';

export default function Results() {
    const [contestants, setContestants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContestants = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/adminhome/view-results');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                if (response.status === 201) {
                    setError(data.message);
                } else {
                    const sortedContestants = data.sort((a, b) => b.voteCount - a.voteCount);
                    setContestants(sortedContestants);
                }
                setLoading(false);
            } catch (error) {
                setError('Error in displaying results');
                setLoading(false);
            }
        };

        fetchContestants();
    }, []);

    if (loading) {
        return <div><CircularProgress /></div>;
    }

    if (error) {
        return (
            <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
                <CardContent>
                    <Typography variant="h5" color="text.secondary">
                        Oops!! No poll has been created
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='parent'>
            

            {contestants.length === 0 ? (
                <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            No Contestants Exist
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            There are no Contestants exist to display at the moment.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name of the Candidate</th>
                            <th>Party Name</th>
                            <th>Vote Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestants.map(contestant => (
                            <tr key={contestant._id}>
                                <td>
                                    <img 
                                        src={contestant.image} 
                                        alt={`${contestant.name}'s photo`} 
                                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' }} 
                                    />
                                </td>
                                <td>{contestant.name}</td>
                                <td>{contestant.party}</td>
                                <td>{contestant.voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

