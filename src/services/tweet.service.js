const {Tweet, Retweet, Like, Reply} = require('../models')

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

async function retweet(id, tweet_id, reply_id) {
    if (tweet_id) {
        const tweet = await Tweet.findOne({where: {id: tweet_id}})
        if (!tweet) {
            return {status: 404, message: "tweet not found"}
        }
        await Retweet.create({user_id: id, tweet_id: tweet_id})
        await tweet.increment('retweet_count')
    }
    else if (reply_id) {
        const reply = await Reply.findOne({where: {id: reply_id}})
        if (!reply) {
            return {status: 404, message: "reply not found"}
        }
        await Retweet.create({user_id: id, reply_id: reply_id})
        await reply.increment('retweet_count')
    }
    else {
        return {status: 400, message: "bad request"}
    }
    return {status: 200, message: "retweeted"}
}

async function undoRetweet(id,retweet_id) {
    const retweet = await Retweet.findOne({where: {id: retweet_id, user_id: id}})
    if (!retweet) {
        return {status: 404, message: "retweet not found"}
    }
    if (retweet.tweet_id) {
        const tweet = await Tweet.findOne({where: {id: retweet.tweet_id}})
        await tweet.decrement('retweet_count')
    } 
    else if (retweet.reply_id) {
        const reply = await Reply.findOne({where: {id: retweet.reply_id}})
        await reply.decrement('retweet_count')
    }
    await retweet.destroy()
    return {status: 200, message: "retweet undoed"}
}

async function getRetweets(id) {
    const retweets = await Retweet.findAll({where: {user_id: id}})
    if (retweets.length == 0) {
        return {status: 404, message: "user has no retweet"}
    }
    return {status: 200, data: retweets}
}

async function getRetweetById(id, retweet_id) {
    const retweet = await Retweet.findOne({where: {user_id: id, id: retweet_id}})
    if (!retweet) {
        return {status: 404, message: "retweet not found"}
    }
    return {status: 200, data: retweet}
}

async function like(id, tweet_id, reply_id) {
    if (tweet_id) {
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
    }
    else if (reply_id) {
        const reply = await Reply.findOne({where: {id: reply_id}})
        if (!reply) {
            return {status: 404, message: "reply not found"}
        }
        const like = await Like.findOne({where: {user_id: id, reply_id: reply.id}})
        if (like) {
            return {status: 400, message: "already liked"}
        }
        await Like.create({user_id: id, reply_id: reply_id})
        await reply.increment('like_count')
    }
    else {
        return {status: 400, message: "bad request"}
    }
    return {status: 200, message: "liked"}
}

async function undoLike(id,like_id) {
    const like = await Like.findOne({where: {id: like_id, user_id: id}})
    if (!like) {
        return {status: 404, message: "like not found"}
    }
    if (like.tweet_id) {
        const tweet = await Tweet.findOne({where: {id: like.tweet_id}})
        await tweet.decrement('like_count')
    } 
    else if (like.reply_id) {
        const reply = await Reply.findOne({where: {id: like.reply_id}})
        await reply.decrement('like_count')
    }
    await like.destroy()
    return {status: 200, message: "like undoed"}
}

async function getLikes(id) {
    const likes = await Like.findAll({where: {user_id: id}})
    if (likes.length == 0) {
        return {status: 404, message: "user has no like"}
    }
    return {status: 200, data: likes}
}

async function getLikeById(id, like_id) {
    const like = await Like.findOne({where: {user_id: id, id: like_id}})
    if (!like) {
        return {status: 404, message: "like not found"}
    }
    return {status: 200, data: like}
}

async function delete_(user_id, tweet_id, reply_id) {
    if (tweet_id) {
        const tweet = await Tweet.findOne({where: {user_id: user_id, id: tweet_id}})
        if (!tweet) {
            return {status: 404, message: "tweet not found"}
        }
        await tweet.destroy()
        return {status: 200, message: "tweet deleted"}
    }
    else if (reply_id) {
        const reply = await Reply.findOne({where: {user_id: user_id, id: reply_id}})
        if (!reply) {
            return {status: 404, message: "reply not found"}
        }
        await reply.destroy()
        return {status:200, message: "reply deleted"}
    }
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
    const replies = await Reply.findAll({where: {user_id: id}})
    if (replies.length == 0) {
        return {status: 404, message: "user has no reply"}
    }
    return {status: 200, data: replies}
}

async function getReplyById(reply_id) {
    const reply = await Reply.findOne({where: {reply_id: reply_id}})
    if (!reply) {
        return {status: 404, message: "reply not found"}
    }
    return {status: 200, data: reply}
}

module.exports = {
    create, 
    update,
    get,
    getById,
    retweet,
    getRetweets,
    like,
    getLikes,
    reply,
    getReplies,
    getReplyById,
    delete_,
    undoRetweet,
    undoLike,
    getRetweetById,
    getLikeById
}