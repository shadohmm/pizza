const jwt = require('jsonwebtoken')
const jwtKey = require('./secrateCode')
module.exports = (req, res, next) => {
    try { 
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token,jwtKey); 
      req.userData = {
              email: decodedToken.email,
              userId: decodedToken.userId,
             
      };    
      next();
    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  };