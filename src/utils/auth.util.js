const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.jwt_key
const refresh_key = process.env.jwt_refresh_key

const encode = (payload, refresh=false) => {
    return jwt.sign({
        data: payload
    }, refresh ? refresh_key : key, {algorithm: "HS256", expiresIn: refresh ? "6h" : "1h"})
}

const decode = (token, refresh=false) => {
    try {
        return jwt.verify(token, refresh ? refresh_key : key, {algorithm: "HS256"})
    }
    catch(err) {
        throw err
    }
}

module.exports = {
    encode, 
    decode
}