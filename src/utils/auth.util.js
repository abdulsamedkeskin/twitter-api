const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.jwt_key

const encode = (payload) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload
    }, key, {algorithm: "HS256"})
}

const decode = (token) => {
    try {
        return jwt.verify(token, key, {algorithm: "HS256"})
    }
    catch(err) {
        throw err
    }
}

module.exports = {
    encode, 
    decode
}