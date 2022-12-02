const {Tweet} = require('../models')
const {encode} = require('../utils/auth.util')


async function create(id, content) {
    await Tweet.create({user_id: id,content: content})
    return {"status": 200, "message": "tweet created"}    
}

async function update(user_id, id, content) {
    const tweet = await Tweet.findOne({where: {user_id: user_id, id: id}})
    if (!tweet) {
        return {"status": 404, "message":"tweet not found"}
    }
    tweet.update({content: content})
    return {"status": 200, "data": "tweet updated"}
}

async function get(id) {
    const tweets = await Tweet.findAll({where: {user_id: id}})
    if (tweets.length == 0) {
        return {"status": 400, "message":"user has no tweet"}
    }
    return {"status": 200, "data": tweets}
}

async function delete_tweet(user_id, id) {
    const tweet = await Tweet.findOne({where: {user_id: user_id, id: id}})
    if (!tweet) {
        return {"status": 404, "message": "tweet not found"}
    }
    await tweet.destroy()
    return {"status": 200, "message": "tweet deleted"}
}

module.exports = {
    create, 
    update,
    get,
    delete_tweet
}