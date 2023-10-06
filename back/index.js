const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dbConnection = require('./config/database');



const User = require('./models/UserSchema');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line for body parsing

// Define your secret key for JWT token signing
const secretKey = 'your-secret-key'; // Replace with your actual secret key

const categoryRoute = require('./routes/categoryRoute');
const postRoute = require('./routes/postRoute');


// Connect with db
dbConnection();


app.get("/", (req, res) => {
    res.send("Welcome our to online Furniture shop API...");
  });

  // Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/post', postRoute );





// global error handeling
app.use((err , req , res , next)=> {
  res.status(404).json({err})
})

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Your Server is running at http://localhost:${port}`));