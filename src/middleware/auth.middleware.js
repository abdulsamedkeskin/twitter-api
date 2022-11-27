const {decode} = require('../utils/auth.util')

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  console.log(req.headers)
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  token = token.split("Bearer ")[1]
  try {
    const decoded = decode(token)
    req.identity = decoded.data.identity
    next()
  }
  catch(err) {
    return res.status(401).json({"status": 401,"message": 'Unauthorized!'});
  }
};

const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;