const mongoose = require('mongoose');

// Define the Contestant schema
const RegisteredSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: [true, 'Please enter Name']
    },
    age:{
       type:Number,
    },
    voteridNumber: {
        type: String,
        required: [true,'Please Enter VoterID Number'],
        minLength: [10, 'VoterID Card Number must be 10 characters'],
        maxLength: [10, 'VoterID Card Number must be 10 characters'],
    },
    
    Idproof: {
        type: String,
        required: [true,'Please Provide Image'], // Set as required if every contestant must have an image
    },
    voterImage:
    {
        type:String,
        required:[true,'Please Provide Candidate Photo'],
    },

          
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Contestant model from the schema
const Registered = mongoose.model('Registered', RegisteredSchema);

// Export the model
module.exports = Registered;