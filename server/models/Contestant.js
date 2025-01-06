// const mongoose = require('mongoose');

// // Define the Contestant schema
// const ContestantSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true,'Please Enter Name'],
//     },
//     party: {
//         type: String,
//         required: [true,'Please enter Party name'],
//         unique:true,
//     },
//     age: {
//         type: Number,
//         required: [true,'Enter age'],
//         min:[25,"Age must be Equal or greater than 25"],
//     },
//     gender: {
//         type: String,
//         enum: ['male', 'female', 'other'],
//         required: [true,'Choose gender']
//     },
//     votes: [
//         {
//             user: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Voter',
//                 required: true
//             },
//             votedAt: {
//                 type: Date,
//                 default: Date.now()
//             }
//         }
//     ],
//     voteCount: {
//         type: Number,
//         default: 0
//     }
// });





// const Contestant = mongoose.model('Contestant', ContestantSchema);
// module.exports = Contestant;

// Importing mongoose to define a schema
const mongoose = require('mongoose');

// Define the Contestant schema
const ContestantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: [true,'Please enter name'],
    },
    party: {
        type: String,
        required: true,
        trim: [true,'Please Enter party name'],
    },
    age: {
        type: Number,
        required: [true,'Please Enter age'],
        min:18 // Assuming a minimum age requirement for contestants
    },
    gender: {
        type: String,
        required: [true,'Please Select gender'],
        enum: ['male', 'female', 'Other'] // Restrict to specific gender values
    },
    image: {
        type: String,
        required: [true,'Please Provide Image'], // Set as required if every contestant must have an image
    },
    votes: [
        {
            voterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Voter',
                required: true
            },
            voteTime: {
                type: Date,
                default: Date.now
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0,
        min: 0 // Ensuring no negative vote counts
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Contestant model from the schema
const Contestant = mongoose.model('Contestant', ContestantSchema);

// Export the model
module.exports = Contestant;

