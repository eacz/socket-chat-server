const jwt = require('jsonwebtoken');


const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id }
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '24h',
    }, (err, jwt) => {
      if(err){
        reject(err)
      } else {
        resolve(jwt)
      }
    } )
  })
}

const checkJWT = (token) => {
  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY)
    return [ true, id]
  } catch (error) {
    return [ false, null]
  }
}


module.exports = {
  generateJWT,
  checkJWT
}