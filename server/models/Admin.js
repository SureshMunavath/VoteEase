const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter Name']
    },
   
    EmployeeId: {
        type: String,
        required: [true,'Please Enter EmployeeId Number'],
        unique: true,
        minLength: [8, 'ID Number must be 8 characters'],
        maxLength: [8, 'ID Number must be 8 characters'],
    },
    password: {
        type: String,
        required: [true,'Please Enter a password'],
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
    throw Error('Incorrect ID Number');
}

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
