const {User} = require('../models/models')
const {encode} = require('../utils/auth.util')


async function register(name, password, email, username) {
    const check = await User.findOne({where: {username: username}})
    if (!check) {
        await User.create({name: name, password: password, username: username, email: email})
        return {"status": 200, "message": "user created"}
    }
    return {"status": 400, "message": "Username already exists"}
    
}

async function login(username, password) {
    const user = await User.findOne({where: {username: username}})
    if (!user) {
        return {"status": 404, "message":"user not found"}
    }
    if (!await user.validatePassword(password)) {
        return {"status": 400, "message": "wrong username or password"}
    } 
    const accessToken = encode({"identity": user.username, "id": user.id})
    const refreshToken = encode({"identity": user.username, "id": user.id}, refresh=true)
    return {"status": 200, "data": {accessToken, refreshToken}}
}

async function refreshToken(identity, id) {
    const accessToken = encode({"identity": identity, "id": id})
    const refreshToken = encode({"identity": identity, "id": id}, refresh=true)
    return {"status": 200, "data": {accessToken, refreshToken}}
}

async function delete_account(identity) {
    const user = await User.findOne({where: {username: identity}})
    if (!user) {
        return {"status": 404, "message": "user not found"}
    }
    await user.destroy()
    return {"status": 200, "message": "user deleted"}
}

module.exports = {
    register, 
    login,
    refreshToken,
    delete_account
}