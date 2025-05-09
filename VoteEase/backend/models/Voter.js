const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Voter schema
const voterSchema = new mongoose.Schema({
    email: {   
        type: String,
        required: [true, 'Please enter your Email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please enter a valid Email'
        }
    },
    username: {
        type: String,
        required: [true, 'Please enter Name']
    },
    dob: {
        type: Date,
        required: [true, 'Please Select Your Date of Birth'],
      },
    voterid: {
        type: String,
        required: [true, 'Please Enter Voter ID Number'],
        unique: true,
        minLength: [10, 'Voter Card Number must be 10 characters'],
        maxLength: [10, 'Voter Card Number must be 10 characters'],
    },
    voteridImage:{
        type:String,
        required:[true,'Please Upload Voter ID image'],
    },
    voterImage:{
        type:String,
        required:[true,'Please Upload Voter ID'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter a password'],
        minLength: [6, 'Minimum Password length is 6 characters'],
    },
    designation: {
        type: String,
        default: 'voter',
        immutable: true // This makes sure that the field cannot be changed once set
    }
});

// Hash password before saving
voterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static method for login
voterSchema.statics.login = async function (voterid, password) {
    const user = await this.findOne({ voterid });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    console.log("wrong");
    throw Error('Incorrect Voter ID Number');
};

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
