const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const adminSchema = new mongoose.Schema({

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
        required: [true, 'Please Enter Name']
    },
   
    EmployeeId: {
        type: String,
        required: [true,'Please Enter EmployeeId Number'],
        unique: true,
        minLength: [12, 'EmployeeId Number must be 12 characters'],
        maxLength: [12, 'EmployeeId Number must be 12 characters'],
    },
    adminImage: {
        type: String,
        required: [true,'Please Provide Image'], // Set as required if every contestant must have an image
    },
    password: {
        type: String,
        required: [true,'Please Enter Password'],
        minLength:[6,'Minimum Password length is 6 charecters'],
    },
    designation: {
        type: String,
        default: 'admin',
        immutable: true // This makes sure that the field cannot be changed once set
    }

    
});

adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
adminSchema.statics.login = async function(EmployeeId,password){
    const user = await this.findOne({EmployeeId});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect EmployeeId Number');
}

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
