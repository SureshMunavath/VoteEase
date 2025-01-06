const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const voterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter Name']
    },
    age: {
        type: Number,
        required: [true, 'Please Enter Age'],
        min: [18, 'Age Must be greater than or equal to 18 Years'],
    },
    aadhar: {
        type: String,
        required: [true,'Please Enter Aadhar Card Number'],
        unique: true,
        minLength: [12, 'Aadhar Card Number must be 12 characters'],
        maxLength: [12, 'Aadhar Card Number must be 12 characters'],
    },
    password: {
        type: String,
        required: [true,'Please Enter a password'],
        minLength:[6,'Minimum Password length is 6 charecters'],
    },
    // isVoted: {
    //     type: Boolean,
    //     default: false
    // },
    designation: {
        type: String,
        default: 'voter',
        immutable: true // This makes sure that the field cannot be changed once set
    }

});

voterSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
voterSchema.statics.login = async function(aadhar,password){
    const user = await this.findOne({aadhar});
   
    if(user){
       
        const auth = await bcrypt.compare(password,user.password);
       
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect Aadhar Number');
}

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
