
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    Email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate: {
        validator: function (value) {
          // Use a regular expression to check if the email contains the "@" symbol
          return /\S+@\S+\.\S+/.test(value);
        },
        message: 'Invalid email format. Email must contain "@" symbol.',
      },
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [6, 'Too short password'],
      required: [true, 'password required'],
    },
    profileimage: {
      type : "String"
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    FirstName: String,
    LastName: String,
    FacebookLink: String,
    InstagramLink: String,
    LinkedinLink: String,
    About: String,


    // verificationCode : String,
  } , { timestamps: true });


  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

// Export the User schema
module.exports = mongoose.model('User', userSchema);