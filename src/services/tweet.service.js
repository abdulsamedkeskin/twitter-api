const {Tweet} = require('../models/models')
const {encode} = require('../utils/auth.util')


async function create(identity, content) {
    await Tweet.create({user_id: identity,content: content})
    return {"status": 200, "message": "tweet created"}    
}

async function update(identity, id, content) {
    const tweet = await Tweet.findOne({where: {user_id: identity, id: id}})
    if (!tweet) {
        return {"status": 404, "message":"tweet not found"}
    }
    tweet.update({content: content})
    return {"status": 200, "data": "tweet updated"}
}

async function get(identity) {
    const tweets = await Tweet.findAll({where: {user_id: identity}})
    if (tweets.length == 0) {
        return {"status": 400, "message":"user has no tweet"}
    }
    return {"status": 200, "data": tweets}
}

async function delete_tweet(identity, id) {
    const tweet = await Tweet.findOne({where: {user_id: identity, id: id}})
    if (!tweet) {
        return {"status": 404, "message": "tweet not found"}
    }
    await Tweet.destroy({where: {id: id}})
    return {"status": 200, "message": "tweet deleted"}
}

module.exports = {
    create, 
    update,
    get,
    delete_tweet
}