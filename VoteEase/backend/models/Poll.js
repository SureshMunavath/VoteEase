const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    totalVotes:
    {
        type:Number,
        required:[true,'Enter Total Number of Votes'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    voters: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Voter'
        }
    ],
    registered:[
        {
            type:String,
        }
    ],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
