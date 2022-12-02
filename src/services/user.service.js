const {Follow} = require('../models')


async function follow(id, follower_id) {
    const follow = await Follow.findOne({where: {user_id: id, follower_id: follower_id}})
    if (follow) {
        return {"status": 400, "message": "user is already following"}
    }
    await Follow.create({user_id: id,follower_id: follower_id})
    return {"status": 200, "message": "followed"}    
}

async function unfollow(user_id, id) {
    const follow = await Follow.findOne({where: {user_id: user_id, follower_id: id}})
    if (!follow) {
        return {"status": 404, "message": "user is not already following"}
    }
    await follow.destroy()
    return {"status": 200, "message": "unfollowed"}
}

async function get(id) {
    const follows = await Follow.findAll({where: {follower_id: id}})
    const followers = await Follow.findAll({where: {user_id: id}})
    console.log(followers)
    console.log(follows)
    if (follows.length == 0 && followers.length == 0) {
        return {"status": 400, "message":"users have neither followers nor follows"}
    }
    return {"status": 200, "data": {followers, follows}}
}


module.exports = {
    follow, 
    unfollow,
    get
}