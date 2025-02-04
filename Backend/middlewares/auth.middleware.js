const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1] ;

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  


  if (isBlacklisted) {
    console.log('Token is blacklisted');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.jwt_Secret);
    
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};