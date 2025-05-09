const express = require('express');
require('dotenv').config();

//console.log(process.env.PORT); 
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

mongoose.connect(process.env.DATABASE_URL)
  .then((result) => app.listen(process.env.PORT,(req,res)=>{
    console.log('mongodb connected and started');
  }))
  .catch((err) => console.log(err));

// app.get('*', checkUser);



app.use(webRoutes);