const {decode} = require('../utils/auth.util')

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  token = token.split("Bearer ")[1]
  try {
    const decoded = decode(token)
    req.identity = decoded.data.identity
    req.id = decoded.data.id
    next()
  }
  catch(err) {
    return res.status(401).json({"status": 401,"message": 'Unauthorized!'});
  }
};


const verifyRefreshToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  token = token.split("Bearer ")[1]
  try {
    const decoded = decode(token, refresh=true)
    req.identity = decoded.data.identity
    req.id = decoded.data.id
    next()
  }
  catch(err) {
    return res.status(401).json({"status": 401,"message": 'Unauthorized!'});
  }
};

const authJwt = {
    verifyToken: verifyToken,
    verifyRefreshToken: verifyRefreshToken
};
module.exports = authJwt;