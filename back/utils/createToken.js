const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; 

const createToken = (payload) =>
  jwt.sign( payload , secretKey );

module.exports = createToken;

