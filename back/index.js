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

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Your Server is running at http://localhost:${port}`)
);
