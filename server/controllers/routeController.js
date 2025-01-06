const  Voter= require('../models/Voter');
const jwt = require('jsonwebtoken')
const Admin=require('../models/Admin');
const Contestant=require('../models/Contestant');
const Poll=require('../models/Poll');
const mongoose = require('mongoose');


// Configure Cloudinary

const handleAdminErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { EmployeeId:'', password:'',username:'' };
    if(err.message=='Incorrect password')
    {
        errors.password='Enter Valid password';
        return errors;
    }

    if(err.message=='Incorrect ID Number')
    {
        errors.EmployeeId='This ID number is not registered';
        return errors;
    }
    if (err.code ==11000) 
    {
      errors.EmployeeId = "This ID Number is already Registered";
      return errors; // Ensure to return the errors object
    }
  
    if (err.message.includes("admin validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
  
const handleVoterErrors=(err)=> {
    console.log(err.message,err.code);
    let errors={aadhar:'',password:'',age:'',username:''};
    if(err.message=='Incorrect password')
    {
        errors.password='Enter Valid password';
        return errors;
    }

    if(err.message=='Incorrect Aadhar Number')
    {
        errors.aadhar='This Aadhar number is not registered';
        return errors;
    }
    if(err.code==11000)
    {
        errors.aadhar="Aadhar Card Number already Registered";
        return errors;
    }
    if(err.message.includes('Voter validation failed'))
    {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}

const handleContestantErrors=(err)=> {
    console.log(err.message,err.code);
    let errors={name:'',party:'',age:'',gender:'',image:''};
    // if(err.message=='Incorrect password')
    // {
    //     errors.password='Enter Valid password';
    //     return errors;
    // }

    // if(err.message=='Incorrect Aadhar Number')
    // {
    //     errors.aadhar='This Aadhar number is not registered';
    //     return errors;
    // }
    if(err.code==11000)
    {
        errors.party="Contestant with this party already registered";
        return errors;
    }
    if(err.message.includes('Contestant validation failed'))
    {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}

const handlePollErrors=(err)=> {
    console.log(err.message,err.code);
    let errors={title:'',description:'',startTime:'',endTime:'',totalVotes:''};
    // if(err.message=='Incorrect password')
    // {
    //     errors.password='Enter Valid password';
    //     return errors;
    // }

    // if(err.message=='Incorrect Aadhar Number')
    // {
    //     errors.aadhar='This Aadhar number is not registered';
    //     return errors;
    // }
    // if(err.code==11000)
    // {
    //     errors.party="Contestant with this party already registered";
    //     return errors;
    // }
    if(err.message.includes('Poll validation failed'))
    {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}


const maxAge = 3*24*60*60;



function createToken(id, aadhar) {
    return jwt.sign({ id, aadhar }, 'votingapp', { expiresIn: maxAge });
}
module.exports.votersignup_post = async (req, res) => {
    const { username, aadhar, password,age } = req.body;
 
    // console.log(req.body);  
    try {
        const user = await Voter.create({ username, aadhar, password,age });
        // console.log(user)
        const token = createToken(user._id, user.aadhar);
        // console.log("token",token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite:'None',secure:true});
        return res.status(200).json({ userType: 'voter', user:user });
    }
    catch (err) {
        console.log(err);
        const errors = handleVoterErrors(err);
         console.log(errors)
        res.status(400).json({ errors });
    }
}
module.exports.voterlogin_post = async (req, res) => {
    const {aadhar, password } = req.body;
    
    try {
        const user = await Voter.login(aadhar, password);

        const token = createToken(user._id, user.aadhar);
        // console.log(token);
        // console.log("token",token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite:'None',secure:true});
        // console.log("hidasdfsdf");
        // console.log(user);
        return res.status(200).json({ userType: 'voter', user:user });
        
    }
    catch (err) {
        const errors = handleVoterErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.adminsignup_post = async (req, res) => {
    const { username,EmployeeId, password} = req.body;
   
    console.log(req.body);  
    try {
        const user = await Admin.create({ username,EmployeeId, password});
        // console.log(user)
        const token = createToken(user._id, user.EmployeeId);
        // console.log("token",token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite:'None',secure:true});
        return res.status(200).json({ userType: 'admin', user: user });
    }
    catch (err) {
        console.log(err);
        const errors = handleAdminErrors(err);
         console.log(errors)
        res.status(400).json({ errors });
    }
}
module.exports.adminlogin_post = async (req, res) => {
    const {EmployeeId, password } = req.body;
    try {
        const user = await Admin.login(EmployeeId, password);

        const token = createToken(user._id, user.EmployeeId);
        // console.log("token",token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite:'None',secure:true});
        // console.log(user);
        return res.status(200).json({ userType: 'admin', user: user });
    }
    catch (err) {
        const errors = handleAdminErrors(err);
        res.status(400).json({ errors });
    }
}


module.exports.Contestant_post = async (req, res) => {
    const { name, party, age, gender ,image} = req.body;
    //console.log("Request received:", { name, party, age, gender ,image});

    try {
        // Attempt to create a new contestant
        const user = await Contestant.create({ name, party, age, gender,image});
        user.save();
        //console.log("New contestant created:", user);
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        const errors = handleContestantErrors(err);
        console.log(errors)
        res.status(400).json({ errors });

    }
};



module.exports.Poll_post = async (req, res) => {
    const { title, description, startTime, endTime,totalVotes} = req.body;
    console.log(title,description,totalVotes);
    // Validate that endTime is not less than startTime
    if (new Date(endTime) < new Date(startTime)) {
        return res.status(402).json({ error: 'End time cannot be less than start time' });
    }

    try {
        // Check if there are any existing polls
        const existingPoll = await Poll.findOne();
        if (existingPoll) {
            return res.status(401).json({ error: 'A poll already exists' });
        }

        // If no existing poll and valid endTime, create a new one
        const poll = await Poll.create({ title, description, startTime, endTime,totalVotes});
        res.status(200).json({ poll });
    } catch (err) {
        console.error(err);
        const errors = handlePollErrors(err); // Assuming you have a function to handle errors
        res.status(400).json({ errors });
    }
};
module.exports.Result_get = async (req, res) => {
    try {
        const poll = await Poll.findOne();
        if (!poll) {
            return res.status(201).json({ message: 'No poll has been created' });
        }
        const contestants = await Contestant.find();
        res.status(200).json(contestants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.Poll_get=async (req,res)=>{
    try{
        const poll=await Poll.findOne();
     if(!poll)
         {
             return res.status(200).json({errors:'No poll has been created'});
         }
         res.status(200).json(poll);
     } 
     catch (err) {
         console.error(err);
         res.status(500).json({ error: 'Internal Server Error' });
     }
}


// module.exports.Poll_delete= async (req, res) => {
//     const { id } = req.params;
//     console.log(id);

//     try {
//         // Find the poll by ID and delete it
//         const poll = await Poll.findByIdAndDelete(id);
//         if (!poll) {
//             return res.status(404).json({ error: 'Poll not found' });
//         }
//         if(poll)
//             {
//                 try {
//                     await Contestant.deleteMany({});
//                     console.log('All documents deleted.');
//                 } catch (error) {
//                     console.error('Error deleting documents:', error);
//                 // } finally {
//                 //     // Close Mongoose connection
//                 //     mongoose.disconnect();
//                 // }
//             }
       

//         res.status(200).json({ message: 'Poll deleted successfully' });
//     }
//  } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports.Poll_delete = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Find the poll by ID and delete it
        const poll = await Poll.findByIdAndDelete(id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        try {
            await Contestant.deleteMany({});
            console.log('All documents deleted.');
        } catch (error) {
            console.error('Error deleting documents:', error);
        }

        res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.Contestant_delete= async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    try{
        // const img_link=await Contestant.findById(id).image;
        // console.log(img_link);
        const candidate=await Contestant.findByIdAndDelete(id);
        if (!candidate) {
            //console.log(candidate.image);
            return res.status(404).json({ error: 'Candidate not found' });
        }
    }
    catch(error)
    {
        res.status(500).json({error:'Internal server error'});
    }
};

// const cloudinary = require('cloudinary').v2;
// //const Contestant = require('../models/Contestant'); // Adjust the path to your model

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'dw4reriae',
//   api_key: '618932643496426',
//   api_secret: 'WKLdrsPg4Gh5WflVDczIvRpbsYw', // Replace with your secret key
// });

// module.exports.Contestant_delete = async (req, res) => {
//   const { id } = req.params;
//   console.log(`Deleting contestant with ID: ${id}`);

//   try {
//     // Find the contestant by ID
//     const contestant = await Contestant.findById(id);
//     if (!contestant) {
//       return res.status(404).json({ error: 'Candidate not found' });
//     }

//     // Extract public_id from image URL
//     const imageUrl = contestant.image;
//     const publicId = imageUrl.split('/').pop().split('.')[0];
//     console.log(`Extracted public_id: ${publicId}`);

//     // Delete the image from Cloudinary
//     const cloudinaryResult = await cloudinary.uploader.destroy(publicId, {
//       timeout: 10000, // Set timeout to 10 seconds
//     });

//     if (cloudinaryResult.result !== 'ok') {
//       console.error('Cloudinary deletion failed:', cloudinaryResult);
//       return res
//         .status(500)
//         .json({ error: 'Failed to delete image from Cloudinary' });
//     }

//     console.log('Cloudinary deletion result:', cloudinaryResult);

//     // Delete the contestant from the database
//     await Contestant.findByIdAndDelete(id);

//     res.status(200).json({ message: 'Candidate and image deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting contestant:', error);
//     if (!res.headersSent) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// };



module.exports.profile_get = async (req, res) => {
    const token = req.cookies.jwt;
    //console.log("Coming here");

    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    jwt.verify(token, 'votingapp', async (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        try {
            const admin = await Admin.findById(info.id);
            if (admin) {
                // console.log(admin);
                return res.status(200).json({ userType: 'admin', user: admin });
            } else {
                try {
                    const voter = await Voter.findById(info.id);
                    if (voter) {
                        // console.log(voter);
                        return res.status(200).json({ userType: 'voter', user: voter });
                    } else {
                        return res.status(404).json({ error: 'Not found' });
                    }
                } catch (voterError) {
                    console.error(voterError);
                    return res.status(500).json({ error: 'Internal server error' });
                }
            }
        } catch (adminError) {
            console.error(adminError);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
};
// module.exports.Vote_Status_get = async (req, res) => {
//     try {
//         const {id} = req.params;

//         // Find the poll by its ID
//         const poll = await Poll.find({});
//         if (!poll) {
//             return res.status(404).json({ error: 'Poll not found' });
//         }

//         // Check if the voter ID exists in the poll's voters array
//         const hasVoted = poll.voters.includes(mongoose.Types.ObjectId(id));

//         res.json({ hasVoted });
//     } catch (error) {
//         console.error('Error checking vote status:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


module.exports.Vote_Status_get = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the provided ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid voter ID' });
      }
  
      // Find the specific poll
      const poll = await Poll.findOne({ /* Add specific query if necessary */ });
      if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
      }
  
      // Ensure poll.voters is an array
      if (!Array.isArray(poll.voters)) {
        return res.status(500).json({ error: 'Poll data is corrupted' });
      }
  
      // Check if the voter ID exists in the poll's voters array
      const hasVoted = poll.voters.some(voterId => voterId.equals(new mongoose.Types.ObjectId(id)));
  
      res.json({ hasVoted });
    } catch (error) {
      console.error('Error checking vote status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



module.exports.Cast_Vote_put = async (req, res) => {
    console.log(req.body);
    const { candidateId, userId } = req.body;
  
    try {
      // Check if the poll exists
      const poll = await Poll.findOne({});
      if (!poll) {
          return res.status(404).json({ error: 'No poll has been created' });
      }
  
      if(poll.voters.length==poll.totalVotes)
     {
            return res.status(401).json({error:'The Poll has reached maximum limit'});
     }
      if (poll.voters.includes(new mongoose.Types.ObjectId(userId))) {
        return res.status(400).json({ error: 'User has already voted' });
      }
  
      // Update the contestant's vote count
      const contestant = await Contestant.findById(candidateId);
      if (!contestant) {
        return res.status(404).json({ error: 'Contestant not found' });
      }
      contestant.voteCount += 1;
      await contestant.save();
  
      // Add the voter ID to the poll's voters array
      poll.voters.push(new mongoose.Types.ObjectId(userId));
      await poll.save();
  
      res.status(200).json({ message: 'Vote casted successfully' });
    } catch (error) {
      console.error('Error casting vote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


  





module.exports.logout_post = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

}







