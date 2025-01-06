const express = require('express');
// require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const webRoutes = require('./routes/webRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

// middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:5173'}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/VotingApp')
  .then((result) => app.listen(3000,(req,res)=>{
    console.log('mongodb connected and started');
  }))
  .catch((err) => console.log(err));

// app.get('*', checkUser);



app.use(webRoutes);