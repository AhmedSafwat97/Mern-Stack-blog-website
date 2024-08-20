const crypto = require('crypto');

// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
// const ApiError = require('../utils/apiError');
// const sendEmail = require('../utils/sendEmail');
const createToken = require('../utils/createToken');

const User = require('../models/UserModel');

// @desc    Signup
// @route   Post /api/v1/auth/signup
// @access  Public
exports.Signup = asyncHandler(async (req, res, next) => {
    const { Email } = req.body;
  
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ Email });
  
    if (existingUser) {
      // If the email already exists, return an error
      return res.status(400).json({ error: 'Email already in use' });
    }
  
    // If the email is unique, create the new user
    const user = await User.create(req.body);
  
    const userObject = { 
      userId : user._id ,
      email : user.Email ,
      firstname : user.FirstName ,
      lastname : user.LastName 
    }
    // Generate a token for the new user
    const token = createToken(userObject);
  
    res.status(201).json({ data: user, token });
  });
  
// @desc    Login
// @route   Post /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {

    const { Email } = req.body;

    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await User.findOne({ Email });
  
    if (!user) {
       // If the email already exists, return an error
       return res.status(400).json({ error: 'invalid Email' });
    }

    // Compare the password
      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Password' });
      }

      const userObject = {
        userId : user._id ,
        email : user.Email ,
        firstname : user.FirstName ,
        lastname : user.LastName ,
        image : user.profileimage
      }

    // 3) generate token
    const token = createToken(userObject);
  
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });

  });

// @desc   get specific user
// @route   GET /api/v1/auth/:id
// @access  Private


  exports.getuserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findById(id);
  
    !user
      ? res.status(404).json({ msg: "there is no user for this id" })
      : res.status(200).json({ data: user });
  });


  exports.getAuthorById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findById(id);
  
    !user
      ? res.status(404).json({ msg: "there is no user for this id" })
      : res.status(200).json({ data: user });
  });

// @desc    Update specific user
// @route   PUT /api/v1/auth/:id
// @access  Private

exports.updateUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;


  // Check if req.file exists and has the filename property
  if (req.file && req.file.filename) {
    const filename = req.file.filename;

    // Construct the image URL
    const imageUrl = `uploads/${filename}`;

    // Set the imageCover field to the imageUrl
    req.body.profileimage = imageUrl;
  }


  const user = await User.findOneAndUpdate(
    { _id: id },
    req.body ,
    { new: true } //to return the after updateing
  );

  delete user._doc.password;


  !user
    ? res.status(404).json({ msg: "there is no user for this id" })
    : res.status(200).json({ data: user });

});

// @desc    Update specific user
// @route   PUT /api/v1/auth/:id
// @access  Private

exports.updateprofileimage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const filename = req.file.filename;

  // Construct the image URL

  const imageUrl = `uploads/${filename}`;


  // Create an object to specify the update, in this case, the `profileimage` field
  const update = { profileimage: imageUrl };

  const user = await User.findOneAndUpdate({ _id: id }, update, {
    new: true, // Return the updated document
  });

  if (!user) {
    res.status(404).json({ msg: "There is no user for this id" });
  } else {
    res.status(200).json({ data: user });
  }
});