const tweetService = require('../services/tweet.service')

async function create(req, res, next) {
    try {
        const { content } = req.body
        if (!content) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await tweetService.create(req.id, content)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { id, content } = req.body
        if (!id && !content) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await tweetService.update(req.id, id, content)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const response = await tweetService.get(req.id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function retweet(req, res, next) {
    try {
        const { tweet_id } = req.body
        if (!tweet_id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await tweetService.retweet(req.id, tweet_id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err)
        next(err)
    }
}

async function delete_tweet(req, res, next) {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await tweetService.delete_tweet(req.id, id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

module.exports = {
    create,
    update,
    get,
    retweet,
    delete_tweet
}