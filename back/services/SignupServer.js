const crypto = require('crypto');
const jwt = require('jsonwebtoken');
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
      Name : user.Name 
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
        sub : "Login Token",
        userId : user._id ,
        email : user.Email ,
        Name : user.Name
      }

    // 3) generate token
    const token = createToken(userObject);
  
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });

  });

// @desc   get specific user
// @route   GET /api/v1/LoginUser
// @access  Private

exports.getUserData = asyncHandler(async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
      return res.status(401).json({ msg: 'Not authorized, token failed' });
  }

  try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID in token
      const user = await User.findById(decoded.userId);

      if (!user) {
          return res.status(404).json({ msg: 'No user found for this token' });
      }

      // Respond with user data
      res.status(200).json({ data: user });
  } catch (error) {
      res.status(401).json({ msg: 'Not authorized, token failed', details: error.message });
  }
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



// const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel');  // Assuming you have a User model
// const Cart = require('../models/CartModel');  // Assuming you have a Cart model

// const getCartForUser = async (req, res, next) => {
//   let token;

//   // Check if the Authorization header exists and starts with 'Bearer '
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get the token from the header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify the token and check expiration
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Find the user by ID from the token's payload
//       const user = await User.findById(decoded.id);

//       // If user does not exist
//       if (!user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       // Find the cart associated with the user
//       const cart = await Cart.findOne({ user: user._id });

//       // If cart does not exist
//       if (!cart) {
//         return res.status(404).json({ message: 'No cart found for this user' });
//       }

//       // Respond with the cart
//       res.status(200).json({ data: cart });
//     } catch (error) {
//       // Handle specific error for expired token
//       if (error.name === 'TokenExpiredError') {
//         return res.status(401).json({ message: 'Token has expired, please log in again' });
//       }

//       // Handle other errors (e.g., invalid token)
//       console.error('Error verifying token or fetching cart:', error);
//       return res.status(401).json({ message: 'Not authorized, token failed or cart not found' });
//     }
//   } else {
//     // No token was provided
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = getCartForUser;