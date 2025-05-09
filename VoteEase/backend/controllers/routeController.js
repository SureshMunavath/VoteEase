require("dotenv").config(); // Load .env variables
console.log(process.env.JWT_SECRET);
const  Voter= require('../models/Voter');
const jwt = require('jsonwebtoken')
const Admin=require('../models/Admin');
const Contestant=require('../models/Contestant');
const Poll=require('../models/Poll');
const Registered=require('../models/Registered');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
// require('dotenv').config();
// Configure Cloudinary
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user:process.env.Email,
      pass:process.env.PASSWORD,
  },
});

const handleAdminErrors = (err) => {
  console.log("Error Object:", err);  // Log the full error object for debugging

  let errors = { EmployeeId: '', password: '', username: '', email: '' };

  if (err.message === 'Incorrect password') {
      errors.password = 'Incorrect Password';
      return errors;
  }

  if (err.message === 'Incorrect EmployeeId Number') {
      errors.EmployeeId = 'This ID number is Not Registered';
      return errors;
  }

  if (err.code === 11000) {
      if (err.keyPattern?.EmployeeId) {
          errors.EmployeeId = 'Employee With This ID Already Exists';
      }
      if (err.keyPattern?.email) {
          errors.email = 'This email is already registered';
      }
      return errors;
  }

  if (err.message.includes("admin validation failed")) {
      console.log("Validation Errors:", err.errors);  // Log validation errors for debugging
      Object.values(err.errors).forEach(({ properties }) => {
          console.log("Property:", properties.path, "Message:", properties.message); // Debug each error
          errors[properties.path] = properties.message;
      });
  }

  return errors;
};

  
//   const handleVoterErrors = (err) => {
//     console.log(err.message, err.code);
//     let errors = { voterid: '', password: '', age: '', username: '', email: '' };

//     if (err.message === 'Incorrect password') {
//         errors.password = 'Incorrect Password';
//         return errors;
//     }

//     if (err.message === 'Incorrect Voter ID Number') {
//         errors.voterid = 'This Voter ID Number is not registered';
//         return errors;
//     }

//     if (err.code === 11000) {
//         if (err.keyPattern?.voterid) {
//             errors.voterid = 'Voter ID Number is already registered';
//         }
//         if (err.keyPattern?.email) {
//             errors.email = 'This email is already registered';
//         }
//         return errors;
//     }

//     if (err.message.includes('Voter validation failed')) {
//         Object.values(err.errors).forEach(({ properties }) => {
//             errors[properties.path] = properties.message;
//         });
//     }

//     return errors;
// };
const handleVoterErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { voterid: '', password: '', age: '', username: '', email: '' };

  if (err.message === 'Incorrect password') {
      errors.password = 'Incorrect Password';
      return errors;
  }

  if (err.message === 'Incorrect Voter ID Number') {
      errors.voterid = 'This Voter ID Number is not registered';
      return errors;
  }

  if (err.code === 11000) {
      if (err.keyPattern?.voterid) {
          errors.voterid = 'Voter ID Number is already registered';
      }
      if (err.keyPattern?.email) {
          errors.email = 'This email is already registered';
      }
      return errors;
  }

  if (err.message.includes('Voter validation failed')) {
      Object.values(err.errors).forEach((error) => {
          const path = error?.properties?.path || error.path;
          const message = error?.properties?.message || error.message;
          if (path && message) {
              errors[path] = message;
          }
      });
  }

  return errors;
};



const handleContestantErrors=(err)=> {
    console.log(err.message,err.code);
    let errors={name:'',party:'',age:'',gender:'',image:''};
    // if(err.message=='Incorrect password')
    // {
    //     errors.password='Enter Valid password';
    //     return errors;
    // }

    // if(err.message=='Incorrect voterid Number')
    // {
    //     errors.voterid='This voterid number is not registered';
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

    // if(err.message=='Incorrect voterid Number')
    // {
    //     errors.voterid='This voterid number is not registered';
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
const handleRegistrationErrors = (err) => {
    let errors = { voterid: "", idProofUrl: "" };
  
    if (err.code === 11000) {
      errors.voterid = "You have already registered for this poll.";
      return errors;
    }
  
    if (err.message.includes("Registered validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };
  


const maxAge = 3*24*60*60;



function createToken(id, voterid) {
    return jwt.sign({ id, voterid },process.env.JWT_SECRET, { expiresIn: maxAge });
}
module.exports.votersignup_post = async (req, res) => {
  console.log(req.body);
    const { username, voterid, password,dob,email,voterImage,voteridImage} = req.body;
 
    // console.log(req.body);  
    try {
        const user = await Voter.create({ email,username, voterid, password,dob,voterImage,voteridImage});
        // console.log(user)
        const token = createToken(user._id, user.voterid);
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
    const {voterid, password } = req.body;
    
    try {
        const user = await Voter.login(voterid, password);

        const token = createToken(user._id, user.voterid);
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite:'None',secure:true});
      
        return res.status(200).json({ userType: 'voter', user:user });
        
    }
    catch (err) {
        const errors = handleVoterErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.adminsignup_post = async (req, res) => {
    const { username,EmployeeId, password,email,adminImage} = req.body;
    //console.log("details",req.body);
   
    
    try {
        const user = await Admin.create({ email,username,EmployeeId, password,adminImage});
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

// module.exports.Poll_get=async (req,res)=>{
//     try{
//         const poll=await Poll.findOne();
//      if(!poll)
//          {
//              return res.status(200).json({errors:'No poll has been created'});
//          }
//          res.status(200).json(poll);
//      } 
//      catch (err) {
//          console.error(err);
//          res.status(500).json({ error: 'Internal Server Error' });
//      }
// }




module.exports.Poll_get = async (req, res) => {
  try {
    const poll = await Poll.findOne({}).sort({ createdAt: -1 }); // Fetch the latest poll
    if (poll) {
      return res.status(200).json(poll);
    } else {
      return res.status(200).json(null); // No poll found, return null instead of error
    }
  } catch (err) {
    console.error('Error fetching poll:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


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

module.exports.profile_get = async (req, res) => {
    const token = req.cookies.jwt;
    //console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    jwt.verify(token,process.env.JWT_SECRET, async (err, info) => {
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



module.exports.Vote_Status_get = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the provided ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid voter ID' });
      }
  
      // Find the specific poll
      const poll = await Poll.findOne({});
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
  
module.exports.Requests_get= async (req,res)=>
{
    try {
        // Fetch all voters from the collection
        const requests = await Registered.find({});
    
        // Check if voters exist
        if (!requests || requests.length === 0) {
          return res.status(404).json({ message: 'No voter requests found.' });
        }
    
        // Send the voter data to the front end
        res.status(200).json(requests);
      } catch (error) {
        console.error('Error fetching voter requests:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}





module.exports.RegisterPoll_post = async (req, res) => {
    const { voterid, idProofUrl } = req.body;
    console.log("the data comming",req.body);
  
    try {
      // Check if voteridNumber and idProofUrl are provided
      if (!voterid || !idProofUrl) {
        return res.status(400).json({
          errors: {
            voterid: !voterid ? "Voter ID Number is required" : "",
            idProofUrl: !idProofUrl ? "ID Proof URL is required" : "",
          },
        });
      }
  
      // Check if the Aadhaar number is already registered
      console.log("Checking for existing registration");
const existingRegistration = await Registered.findOne({ voteridNumber: voterid });
console.log("Existing registration check completed");

      if (existingRegistration) {
        
        return res.status(400).json({
          errors: { voterid: "You have already registered for this poll." },
        });
      }
  
      // Retrieve voter details using the Aadhaar number
      console.log("working");
      const voterDetails = await Voter.findOne({ voterid: voterid }, { username: 1, dob: 1, _id: 0,voterImage: 1});
      console.log(voterDetails)
  
      if (!voterDetails) {
        return res.status(404).json({
          errors: { voterid: "Please Enter Correct voterid Number." },
        });
      }
      const { username,dob,voterImage} = voterDetails;
      const age = new Date().getFullYear() - new Date(dob).getFullYear() - (new Date() < new Date(new Date().getFullYear(), new Date(dob).getMonth(), new Date(dob).getDate()) ? 1 : 0);
      console.log("creating")
      const registration = await Registered.create({
        name: username,
        age,
        voteridNumber: voterid,
        Idproof: idProofUrl,
        voterImage,
      });
      console.log("created")
      await registration.save();
  
      res.status(200).json({ registration });
    } catch (err) {
      const errors = handleRegistrationErrors(err);
      res.status(400).json({ errors });
    }
  };
  
//  module.exports.Accept_request_post=async (req, res) => {
//     const { voterid } = req.body; // Expect only Aadhaar number from frontend
//     console.log(voterid);
    
//     if (!voterid) {
//       return res.status(400).json({ message: "Aadhaar number is required" });
//     }
  
//     try {
//       // Find the poll (assuming you are adding the Aadhaar to a specific poll)
//       const poll = await Poll.findOne({});  // Here, find the first poll. You can modify as needed
  
//       if (!poll) {
//         return res.status(404).json({ message: "Poll not found" });
//       }
  
//       // Check if Aadhaar number already exists in the registered array
//       if (poll.registered.includes(voterid)) {
//         return res.status(400).json({ message: "Aadhaar number already registered" });
//       }
  
//       // Push the Aadhaar number to the registered array
//       poll.registered.push(voterid);
  
//       // Save the updated poll document
//       await poll.save();
  
//       res.status(200).json({ message: "Aadhaar number successfully added to poll" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };

// module.exports.Accept_request_post = async (req, res) => {
//     const { voterid } = req.body; // Expect only Aadhaar number from frontend
//     console.log(voterid);
    
//     if (!voterid) {
//       return res.status(400).json({ message: "Aadhaar number is required" });
//     }
  
//     try {
//       // Find the poll (assuming you are adding the Aadhaar to a specific poll)
//       const poll = await Poll.findOne({});  // Here, find the first poll. You can modify as needed
  
//       if (!poll) {
//         return res.status(404).json({ message: "Poll not found" });
//       }
  
//       // Check if Aadhaar number already exists in the registered array
//       if (poll.registered.includes(voterid)) {
//         return res.status(400).json({ message: "Aadhaar number already registered" });
//       }
  
//       // Push the Aadhaar number to the registered array
//       poll.registered.push(voterid);
  
//       // Save the updated poll document
//       await poll.save();
  
//       // Find and delete the entry from the registered collection (assuming you have a 'Registered' collection)
//       const deletedEntry = await Registered.deleteOne({ voterid: voterid });
  
//       if (deletedEntry.deletedCount === 0) {
//         console.error("No entry found in registered collection for deletion.");
//       }
//       const voter=Voter.findOne({voterid:voterid});
//       const pollName=poll.title;
//       const startTime=poll.startTime;
//       const endTime=poll.endTime;
//       const email=voter.email;
      
//       await transporter.sendMail({
//         from: process.env.Email,
//         to: email,
//         subject: "Approval of Your Voting Request",
//         text: `Dear Voter,
    
//     Your request to participate in the poll "${pollName}" has been approved.
    
//     Poll Details:
//     - **Poll Name**: ${pollName}
//     - **Start Time**: ${startTime}
//     - **End Time**: ${endTime}
    
//     You can cast your vote during the specified time.
    
//     Best Regards,  
//     VoteEase Team`
//     });
    

//       res.status(200).json({ message: "Aadhaar number successfully added to poll and removed from registered collection" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
//   module.exports.Reject_request_delete = async (req, res) => {
//     const { voterid } = req.body; // Expect only Aadhaar number from frontend
//     console.log(voterid);
    
//     if (!voterid) {
//       return res.status(400).json({ message: "Aadhaar number is required" });
//     }
  
//     try {
//       // Find the poll (assuming you are adding the Aadhaar to a specific poll)
      
//       // if (!poll.registered.includes(voterid)) {
//       //   return res.status(400).json({ message: "This voterid number is not registered" });
//       // }
//       const voter=Voter.findOne({voterid:voterid});
//       const deletedEntry = await Registered.deleteOne({ voterid: voterid });
//       await transporter.sendMail({
//         from: process.env.Email,
//         to: voter.email,
//         subject: "Rejection of Your Voting Request",
//         text: `Dear "${voter.username},
    
//           Your request to participate in the poll "${pollName}" has been Rejected.`
//       })
  
//       if (deletedEntry.deletedCount === 0) {
//         console.error("No entry found in registered collection for deletion.");
//       }
      

   
//       res.status(200).json({ message: "Aadhaar number successfully  removed from registered collection" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };



module.exports.Accept_request_post = async (req, res) => {
  const { voteridNumber } = req.body; // Expect only Aadhaar number from frontend
  console.log(voteridNumber);
  
  if (!voteridNumber) {
      return res.status(400).json({ message: "Voter ID Number is required" });
  }

  try {
      // Find the poll
      const poll = await Poll.findOne({}); // Modify the query as needed

      if (!poll) {
          return res.status(404).json({ message: "Poll not found" });
      }

      // Check if Aadhaar is already registered
      if (poll.registered.includes(voteridNumber)) {
          return res.status(400).json({ message: "Voter ID number already registered" });
      }

      // Add Aadhaar to registered voters
      poll.registered.push(voteridNumber);
      await poll.save();

      // Delete entry from 'Registered' collection
      const deletedEntry = await Registered.deleteOne({ voteridNumber: voteridNumber });

      if (deletedEntry.deletedCount === 0) {
          console.error("No entry found in registered collection for deletion.");
      }

      // Fetch voter details
      const voter = await Voter.findOne({ voterid: voteridNumber });

      if (!voter) {
          return res.status(404).json({ message: "Voter not found" });
      }

      // Send email
      await transporter.sendMail({
          from: process.env.Email,
          to: voter.email,
          subject: "Approval of Your Voting Request",
          text: `Dear ${voter.username || "Voter"},

Your request to participate in the poll "${poll.title}" has been approved.

Poll Details:
- **Poll Name**: ${poll.title}
- **Start Time**: ${poll.startTime}
- **End Time**: ${poll.endTime}

You can cast your vote during the specified time.

Best Regards,  
VoteEase Team`
      });

      res.status(200).json({ message: "Aadhaar number successfully added to poll and removed from registered collection" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Reject request endpoint
module.exports.Reject_request_delete = async (req, res) => {
  const { voteridNumber} = req.body; // Expect only Aadhaar number from frontend
  console.log(voteridNumber);
  
  if (!voteridNumber) {
      return res.status(400).json({ message: "Voter ID number is required" });
  }

  try {
      // Find voter details
      const voter = await Voter.findOne({ voterid: voteridNumber });

      if (!voter) {
          return res.status(404).json({ message: "Voter not found" });
      }

      // Delete from 'Registered' collection
      const deletedEntry = await Registered.deleteOne({ voteridNumber: voteridNumber });

      if (deletedEntry.deletedCount === 0) {
          console.error("No entry found in registered collection for deletion.");
      }

      // Send rejection email
      await transporter.sendMail({
          from: process.env.Email,
          to: voter.email,
          subject: "Rejection of Your Voting Request",
          text: `Dear ${voter.username || "Voter"},

Your request to participate in the voting process has been rejected.

Best Regards,  
VoteEase Team`
      });

      res.status(200).json({ message: "Aadhaar number successfully removed from registered collection" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};





  

const OTP={};
module.exports.SendOtp_post = async (req, res) => {
  const { email } = req.body;

  try {
      // Check if email already exists
      const dup = await Voter.findOne({ email: email });

      if (dup) {
          throw new Error("DuplicateEmail"); // Throwing a custom error
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log("The OTP is", otp);

      // Store OTP in a temporary session/database (Implementation needed)
      OTP[email] = otp;

      // Send email
      await transporter.sendMail({
          from: process.env.Email,
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP code is ${otp}.`,
      });

      res.json({ success: true, message: "OTP sent successfully", otp }); // Log OTP for testing
  } catch (error) {
      let errors = {};

      if (error.message === "DuplicateEmail") {
          errors.email = "This email is already registered";
      } else {
          errors = handleVoterErrors(error); // Call your existing error handler
      }

      res.status(400).json({ errors });
  }
};

module.exports.VerifyOtp_post=async(req,res)=>
  {
    const { email, enteredOtp } = req.body;
    if(OTP[email]==enteredOtp)
      {
        res.json({ success: true, message: 'OTP verified' });        
        console.log("matched");
      }
     else
     {
      res.status(500).json({error:"Enter Valid OTP"});
     }
  }
  module.exports.SendAdminOtp_post=async(req,res)=>
  {

     const { email } = req.body;

  try {
      // Check if email already exists
      const dup = await Admin.findOne({ email: email });

      if (dup) {
          throw new Error("DuplicateEmail"); // Throwing a custom error
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log("The OTP is", otp);

      // Store OTP in a temporary session/database (Implementation needed)
      OTP[email] = otp;

      // Send email
      await transporter.sendMail({
          from: process.env.Email,
          to: email,
          subject: "Your OTP!",
          text: `Well Come to VoteEase!,Your OTP is: ${otp}.`,
      });

      res.json({ success: true, message: "OTP sent successfully", otp }); // Log OTP for testing
  } catch (error) {
      let errors = {};

      if (error.message === "DuplicateEmail") {
          errors.email = "This email is already registered";
      } else {
          errors = handleAdminErrors(error); // Call your existing error handler
      }

      res.status(400).json({ errors });
  }
  }
  module.exports.VerifyAdminOtp_post=async(req,res)=>
  {
      const { email, enteredOtp } = req.body;
    if(OTP[email]==enteredOtp)
      {
        res.json({ success: true, message: 'OTP verified' });        
        console.log("matched");
      }
     else
     {
      res.status(500).json({error:"Enter Valid OTP"});
     }
  }



  module.exports.Edit_Voter_Account_put = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, age } = req.body; // Removed voterid
  
      console.log("The details:", username, email, age);
  
      // Find the voter by ID and update the details
      const updatedVoter = await Voter.findByIdAndUpdate(
        id,
        { username, email, age }, // Removed voterid from update fields
        { new: true, runValidators: true }
      );
  
      if (!updatedVoter) {
        return res.status(404).json({ message: "Voter not found" });
      }
  
      res.status(200).json({ message: "Voter account updated successfully", voter: updatedVoter });
    } catch (error) {
      console.error("Error updating voter account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  // module.exports.Voter_delete_Account = async (req, res) => {
  //     const { id } = req.params;
  //     console.log("Request to delete the account", id);
  
  //     try {
  //       const voter=await Voter.findOne(id);
  //         //const deletedVoter = await Voter.findByIdAndDelete(id);
  
  //         if (voter) {
  //             return res.status(404).json({ message: "Voter not found" });
  //         }
  
  //         res.status(200).json({ message: "Voter account deleted successfully" });
  //     } catch (error) {
  //         console.error("Error deleting voter:", error);
  //         res.status(500).json({ message: "Internal server error" });
  //     }
  // };

  module.exports.Voter_delete_Account = async (req, res) => {
    const { id } = req.params;
    console.log("Request to delete the account:", id);
  
    try {
      // Try to find and delete from Voter collection
      const voter = await Voter.findById(id);
      if (voter) {
        await Voter.findByIdAndDelete(id);
        return res.status(200).json({ message: "Voter account deleted successfully" });
      }
  
      // If not in Voter, try Admin collection
      const admin = await Admin.findById(id);
      if (admin) {
        await Admin.findByIdAndDelete(id);
        return res.status(200).json({ message: "Admin account deleted successfully" });
      }
  
      // If not found in both
      return res.status(404).json({ message: "Account not found" });
    } catch (error) {
      console.error("Error deleting account:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  


  module.exports.Edit_Admin_Account_put = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
  
      console.log("The details:", username, email);
  
      // Find the admin by ID
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Check if email is being changed
      if (admin.email !== email) {
        const existingAdmin = await Admin.findOne({ email, _id: { $ne: id } }); // Exclude current admin
        if (existingAdmin) {
          return res.status(400).json({ message: "Admin with this Email already exists" });
        }
      }
  
      // Update admin details
      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { username, email },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        message: "Admin account updated successfully",
        admin: updatedAdmin,
      });
    } catch (error) {
      console.error("Error updating admin account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const formidable = require('formidable');
  const path = require('path');
  const { exec } = require('child_process');
  
  module.exports.CompareImages_post = async (req, res) => {
    console.log("comming here");
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads');
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error during file upload' });
      }
  
      if (!files.image1 || !files.image2) {
        return res.status(400).json({ error: 'Both images are required' });
      }
      //console.log(files);
      const img1Path = files.image1[0].filepath;
      const img2Path = files.image2[0].filepath;
  
      console.log("Comparing:");
      console.log(" -", img1Path);
      console.log(" -", img2Path);
  
      const pythonScript = path.join(__dirname, '../scripts/compare_faces.py');
  
      exec(`python3 "${pythonScript}" "${img1Path}" "${img2Path}"`, (error, stdout, stderr) => {
        if (error) {
          console.error("Python script error:", stderr || error.message);
          return res.status(500).json({ error: `Python error: ${stderr || error.message}` });
        }
  
        try {
          const lines = stdout.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          const result = JSON.parse(lastLine);
          //console.log("Match result:", result.similarity);
          res.json(result);
        } catch (parseError) {
          console.error("Failed to parse Python output:", stdout);
          res.status(500).json({ error: 'Error parsing Python output' });
        }
      });
    });
  };





// module.exports.VerifyAdmin_post = async (req, res) => {
//   console.log("comming here");
//   const form = new formidable.IncomingForm();
//     form.uploadDir = path.join(__dirname, '../uploads');
//     form.keepExtensions = true;
  
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error during file upload' });
//       }
  
//       if (!files.webcamImage || !files.aadharImage) {
//         return res.status(400).json({ error: 'Both images are required' });
//       }
      
//       const img1Path = files.webcamImage[0].filepath;
//       const img2Path = files.aadharImage[0].filepath;
      
  
//       console.log("Comparing:");
//       console.log(" -", img1Path);
//       console.log(" -", img2Path);

//       const pythonScript = path.join(__dirname, '../scripts/compare_faces.py');
//       exec(`python3 "${pythonScript}" "${img1Path}" "${img2Path}"`, (error, stdout, stderr) => {
//         if (error) {
//           console.error("Python script error:", stderr || error.message);
//           return res.status(500).json({ error: `Python error: ${stderr || error.message}` });
//         }




// })
// };



// const { exec } = require('child_process');
// const path = require('path');
// const formidable = require('formidable');
const fs = require('fs');

// module.exports.VerifyAdmin_post = async (req, res) => {
//   //console.log("comming here");
//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(__dirname, '../uploads');
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error during file upload' });
//     }

//     if (!files.webcamImage || !files.aadharImage) {
//       return res.status(400).json({ error: 'Both images are required' });
//     }

//     const img1Path = files.webcamImage[0].filepath;
//     const img2Path = files.aadharImage[0].filepath;

//     // Step 1: Run Aadhaar extraction
//     const extractScript = path.join(__dirname, '../scripts/aadharcheck.py');
//     exec(`python3 "${extractScript}" "${img2Path}"`, (err, stdout, stderr) => {
//       if (err || stderr) {
//         console.error("Aadhaar extraction error:", stderr || err.message);
//         return res.status(500).json({ error: "Error validating Aadhaar card." });
//       }

//       let aadhaarResult;
//       try {
//         aadhaarResult = JSON.parse(stdout);
//         console.log("aadhar result",aadhaarResult);
//       } catch (e) {
//         return res.status(500).json({ error: "Invalid JSON from Aadhaar script." });
//       }

//       if (!aadhaarResult || aadhaarResult === false) {
//         return res.status(400).json({ valid: false, error: "Not a valid Aadhaar card." });
//       }

//       // Step 2: Aadhaar is valid, now compare faces
//       const compareScript = path.join(__dirname, '../scripts/compare_faces.py');
//       exec(`python3 "${compareScript}" "${img1Path}" "${img2Path}"`, (err2, stdout2, stderr2) => {
//         if (err2) {
//           console.error("Face comparison error:", err2.message);
//           return res.status(500).json({ error: "Error comparing images." });
//         }
      
//         try {
//           const lines = stdout2.trim().split('\n');
//           const lastLine = lines[lines.length - 1];
//           const result = JSON.parse(lastLine);
      
//           //console.log("Match result:", result);
      
//           return res.json({
//             valid: true,
//             name: aadhaarResult.name,
//             aadhaar_number: aadhaarResult.aadhaar_number,
//             similarity: result.similarity,
//             face_match: result.result === 'faces_match'
//           });
//         } catch (parseError) {
//           console.error("Failed to parse Python output:", stdout2);
//           return res.status(500).json({ error: 'Error parsing Python output' });
//         }
//       });      
      
      
//     });
//   });
// };

// const formidable = require('formidable');
// const path = require('path');
// const { exec } = require('child_process');

// module.exports.VerifyAdmin_post = async (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(__dirname, '../uploads');
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error during file upload' });
//     }

//     if (!files.webcamImage || !files.aadharImage) {
//       return res.status(400).json({ error: 'Both images are required' });
//     }

//     const img1Path = files.webcamImage[0].filepath;
//     const img2Path = files.aadharImage[0].filepath;
//     console.log(img1Path+" "+img2Path);

//     // Step 1: Aadhaar extraction
//     const extractScript = path.join(__dirname, '../scripts/aadharcheck.py');
//     exec(`python3 "${extractScript}" "${img2Path}"`, (err, stdout, stderr) => {
//       if (err || stderr) {
//         console.error("Aadhaar extraction error:", stderr || err.message);
//         return res.status(500).json({ error: "Error validating Aadhaar card." });
//       }

//       let aadhaarResult;
//       try {
//         aadhaarResult = JSON.parse(stdout);
//         console.log("Aadhaar result:", aadhaarResult);
//       } catch (e) {
//         return res.status(500).json({ error: "Invalid JSON from Aadhaar script." });
//       }

//       if (!aadhaarResult || aadhaarResult === false) {
//         return res.status(422).json({ errorType: 'aadhaar', error: "Please upload a valid Aadhaar card." });
//       }

//       // Step 2: Compare faces
//       const compareScript = path.join(__dirname, '../scripts/compare_faces.py');
//       exec(`python3 "${compareScript}" "${img1Path}" "${img2Path}"`, (err2, stdout2, stderr2) => {
//         if (err2 || stderr2) {
//           console.error("Face comparison error:", stderr2 || err2.message);
//           return res.status(500).json({ error: "Error comparing images." });
//         }

//         try {
//           const lines = stdout2.trim().split('\n');
//           const lastLine = lines[lines.length - 1];
//           const result = JSON.parse(lastLine);

//           if (result.result !== 'faces_match') {
//             return res.status(409).json({
//               errorType: 'face_match',
//               error: "Face recognition failed. Please reupload updated Aadhaar and take a clear live photo."
//             });
//           }

//           return res.status(200).json({
//             valid: true,
//             name: aadhaarResult.name,
//             aadhaar_number: aadhaarResult.aadhaar_number,
//             similarity: result.similarity,
//             face_match: true
//           });
//         } catch (parseError) {
//           console.error("Failed to parse Python output:", stdout2);
//           return res.status(500).json({ error: 'Error parsing Python output' });
//         }
//       });
//     });
//   });
// };


module.exports.VerifyAdmin_post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error during file upload' });
    }

    if (!files.webcamImage || !files.aadharImage) {
      return res.status(400).json({ error: 'Both images are required' });
    }

    // Ensure files are properly uploaded and handle potential issues
    const img1Path = files.webcamImage[0] ? files.webcamImage[0].filepath : null;
    const img2Path = files.aadharImage[0] ? files.aadharImage[0].filepath : null;

    if (!img1Path || !img2Path) {
      return res.status(400).json({ error: 'Invalid image paths' });
    }

    // Step 1: Aadhaar extraction
    const extractScript = path.join(__dirname, '../scripts/aadharcheck.py');
    exec(`python3 "${extractScript}" "${img2Path}"`, (err, stdout, stderr) => {
      if (err) {
        console.error("Aadhaar extraction script execution error:", err.message);
        return res.status(500).json({ error: "Error running Aadhaar validation script." });
      }

      if (stderr.toLowerCase().includes("error")) {
        console.error("Aadhaar extraction stderr:", stderr);
        return res.status(500).json({ error: "Error validating Aadhaar card." });
      }

      let aadhaarResult;
      try {
        aadhaarResult = JSON.parse(stdout.trim());
        console.log("Aadhaar result:", aadhaarResult);
      } catch (e) {
        console.error("Invalid JSON from Aadhaar script:", stdout);
        return res.status(500).json({ error: "Invalid JSON from Aadhaar script." });
      }

      if (!aadhaarResult || aadhaarResult === false) {
        return res.status(422).json({
          errorType: 'aadhaar',
          error: "Please upload a valid Aadhaar card."
        });
      }

      // Step 2: Compare faces
      const compareScript = path.join(__dirname, '../scripts/compare_faces.py');
      exec(`python3 "${compareScript}" "${img1Path}" "${img2Path}"`, (err2, stdout2, stderr2) => {
        if (err2) {
          console.error("Face comparison script execution error:", err2.message);
          return res.status(500).json({ error: "Error running face comparison script." });
        }

        // Ignore TensorFlow informational logs and capture real errors
        if (stderr2 && !stderr2.includes("oneDNN custom operations")) {
          console.error("Face comparison stderr:", stderr2);
          return res.status(500).json({ error: "Error in face comparison script." });
        }

        try {
          const lines = stdout2.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          const result = JSON.parse(lastLine);

          if (result.result !== 'faces_match') {
            return res.status(409).json({
              errorType: 'face_match',
              error: "Face recognition failed. Please reupload updated Aadhaar and take a clear live photo."
            });
          }

          return res.status(200).json({
            valid: true,
            name: aadhaarResult.name,
            aadhaar_number: aadhaarResult.aadhaar_number,
            similarity: result.similarity,
            face_match: true
          });
        } catch (parseError) {
          console.error("Failed to parse Python output:", stdout2);
          return res.status(500).json({ error: 'Error parsing Python output' });
        }
      });
    });
  });
};



module.exports.VerifyVoter_post=async (req,res)=>
{

}

module.exports.logout_post = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    
    res.redirect('/');

}







