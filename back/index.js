const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dbConnection = require("./config/database");
const path = require("path");

const User = require("./models/UserModel");

const app = express();
app.use(cors());
app.use(express.json()); // Add this line for body parsing

const categoryRoute = require("./routes/categoryRoute");
const postRoute = require("./routes/postRoute");
const SignRoute = require("./routes/SignRoute");
const CommentsRoute = require("./routes/CommentsRoute")
// Connect with db
dbConnection();

app.get("/", (req, res) => {
  res.send("Welcome our to online Furniture shop API...");
});

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/comments", CommentsRoute);

// Define a route to serve static files (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Auth Route
app.use("/api/v1/auth", SignRoute);

// global error handeling
app.use((err, req, res, next) => {
  res.status(404).json({ err });
});

// app.post('/signup', async (req, res) => {
//     const {
//       firstName,
//       lastName ,
//       Email,
//       Password,
//       verificationCode
//     } = req.body;

//     try {
//       // Check if user already exists
//       const user = await User.findOne({ Email });
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid Email' });
//       }

//       // Hash the password
//       const hashedPassword = bcrypt.hashSync(Password, 10);

//       // Create a new user instance
//       const newUser = new User({
//         firstName,
//         lastName ,
//         Email,
//         password: hashedPassword,
//         verificationCode
//       });

//       // Save the new user to the database
//       const savedUser = await newUser.save();

//       // Convert the Mongoose model instance to a plain object
//       const userObject = savedUser.toObject();

//       // Generate JWT token
//       const token = jwt.sign(userObject, secretKey);

//       // Send the token in the response
//       res.json({ token });
//     } catch (error) {
//       console.error('Error saving user:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   });

// app.post('/signin', async (req, res) => {
//     const { Email , Password } = req.body;

//     try {
//       // Find the user by username
//       const user = await User.findOne({ Email });
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid Email' });
//       }

//       // Compare the password
//       const isPasswordValid = bcrypt.compareSync(Password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid Password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign(user.toObject(), secretKey);

//       // Send the token in the response
//       res.json({ token });
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   });

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Your Server is running at http://localhost:${port}`)
);
