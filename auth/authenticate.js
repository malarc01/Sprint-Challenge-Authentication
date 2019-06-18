const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')
const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';
  // console.log()

// quickly see what this file exports
module.exports = {
  authenticate,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if (err) {
        //token is not valid
        return res.status(401).json({message:"STOP",err});
      } else {
        // VALID TOKEN
        req.decoded = decoded;
        next();
      }
    });
  } 
}
