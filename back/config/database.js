// Connect to MongoDB database
const mongoose = require('mongoose');
const { ConnectDatabase } = require('./configFile');

const dbConnection = () => {
  mongoose.connect(process.env.DATA_BASE_URL, {
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