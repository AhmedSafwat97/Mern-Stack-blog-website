const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; 

const expiresIn = '1h';

const createToken = (payload) =>
  jwt.sign( payload , secretKey , { expiresIn });

module.exports = createToken;

