const {Tweet} = require('../models/models')
const {encode} = require('../utils/auth.util')


async function create(identity, text) {
    await Tweet.create({created_by: identity,text: text})
    return {"status": 200, "message": "tweet created"}    
}

async function update(identity, id, text) {
    const tweet = await Tweet.findOne({where: {created_by: identity, id: id}})
    if (!tweet) {
        return {"status": 404, "message":"tweet not found"}
    }
    tweet.update({text: text})
    return {"status": 200, "data": "tweet updated"}
}

async function get(identity) {
    const tweets = await Tweet.findAll({where: {created_by: identity}})
    if (tweets.length == 0) {
        return {"status": 400, "message":"user has no tweet"}
    }
    return {"status": 200, "data": tweets}
}

async function delete_tweet(identity, id) {
    const tweet = await Tweet.findOne({where: {created_by: identity, id: id}})
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