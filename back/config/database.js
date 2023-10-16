// Connect to MongoDB database
const mongoose = require('mongoose');
const { ConnectDatabase } = require('./configFile');

const dbConnection = () => {
  mongoose.connect("mongodb+srv://blogging:12345@cluster0.z2jl82p.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
  });
};

module.exports = dbConnection;