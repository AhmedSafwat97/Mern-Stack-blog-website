// Define the User schema


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email: String,
    password: String,
    firstName: String,
    LastName: String,
    verificationCode : String,
  });



// Export the User schema
module.exports = mongoose.model('User', userSchema);