const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyJWT = async (req,res,next) => {
  const token = req.headers['token-sk'];
  if(!token){
    return res.status(400).json({ok: false, msg: 'There is no token'})
  }
  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = id;
    next()
  } catch (error) {
    return res.status(401).json({ok: false, msg: 'Invalid token'})
  }
}


module.exports = verifyJWT