const {User} = require('../models/auth.model')
const {encode} = require('../utils/auth.util')


async function register(username, password) {
    const check = await User.findOne({where: {username: username}})
    if (!check) {
        await User.create({username: username, password: password})
        return {"status": 200, "message": "user created"}
    }
    return {"status": 400, "message": "Username already exists"}
    
}

async function login(username, password) {
    const user = await User.findOne({where: {username: username}})
    if (!user) {
        return {"status": 400, "message":"user not found"}
    }
    if (!await user.validatePassword(password)) {
        return {"status": 400, "message": "wrong username or password"}
    } 
    const accessToken = encode({"identity": user.username, "id": user.id})
    return {"status": 200, "data": {accessToken}}
}

async function delete_account(identity) {
    const user = await User.findOne({where: {username: identity}})
    if (!user) {
        return {"status": 400, "message": "user not found"}
    }
    await User.destroy({where: {username: identity}})
    return {"status": 200, "message": "user deleted"}
}

module.exports = {
    register, 
    login,
    delete_account
}