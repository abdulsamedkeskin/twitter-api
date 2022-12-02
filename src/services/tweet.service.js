const {Tweet, Retweet, Like, Reply, User} = require('../models')
const {encode} = require('../utils/auth.util')


async function create(id, content) {
    await Tweet.create({user_id: id,content: content})
    return {status: 200, message: "tweet created"}    
}

async function update(user_id, id, content) {
    const tweet = await Tweet.findOne({where: {user_id: user_id, id: id}})
    if (!tweet) {
        return {status: 404, message: "tweet not found"}
    }
    tweet.update({content: content})
    return {status: 200, message: "tweet updated"}
}

async function get(id) {
    const tweets = await Tweet.findAll({where: {user_id: id}})
    if (tweets.length == 0) {
        return {status: 400, message: "user has no tweet"}
    }
    return {status: 200, data: tweets}
}

async function getById(id) {
    const tweet = await Tweet.findOne({where: {id: id}})
    if (!tweet) {
        return {status: 404, message: "tweet not found"}
    }
    return {status: 200, data: tweet}
}

async function retweet(id, tweet_id) {
    const tweet = await Tweet.findOne({where: {id: tweet_id}})
    if (!tweet) {
        return {status: 404, message: "tweet not found"}
    }
    await Retweet.create({user_id: id, tweet_id: tweet_id})
    await tweet.increment('retweet_count')
    return {status: 200, message: "retweeted"}
}

async function like(id, tweet_id) {
    const tweet = await Tweet.findOne({where: {id: tweet_id}})
    if (!tweet) {
        return {status: 404, message: "tweet not found"}
    }
    const like = await Like.findOne({where: {user_id: id, tweet_id: tweet.id}})
    if (like) {
        return {status: 400, message: "already liked"}
    }
    await Like.create({user_id: id, tweet_id: tweet_id})
    await tweet.increment('like_count')
    return {status: 200, message: "liked"}
}

async function delete_tweet(user_id, id) {
    const tweet = await Tweet.findOne({where: {user_id: user_id, id: id}})
    if (!tweet) {
        return {status: 404, message: "tweet not found"}
    }
    await tweet.destroy()
    return {status: 200, message: "tweet deleted"}
}

async function reply(user_id,reply_id, content) {
    const tweet = await Tweet.findOne({where: {id: reply_id}})
    if (!tweet) {
        const reply = await Reply.findOne({where: {id: reply_id}})
        if (!reply) {
            return {status: 404, message: "reply not found"}
        }
        await Reply.create({content: content, user_id: user_id,reply_id: reply_id})
        await reply.increment('reply_count')
        return {status: 200, message: "replied"}
    }
    await Reply.create({content: content, user_id: user_id,reply_id: reply_id})
    await tweet.increment('reply_count')
    return {status: 200, message: "replied"}
}

async function getReplies(id) {
    const reply = await Reply.findAll({where: {user_id: id}})
    if (reply.length == 0) {
        return {status: 404, message: "user has no replies"}
    }
    return {status: 200, data: reply}
}

async function getReplyById(reply_id) {
    const reply = await Reply.findOne({where: {reply_id: reply_id}})
    if (!reply) {
        return {status: 404, message: "user has no replies"}
    }
    return {status: 200, data: reply}
}

module.exports = {
    create, 
    update,
    get,
    getById,
    retweet,
    like,
    reply,
    getReplies,
    getReplyById,
    delete_tweet
}