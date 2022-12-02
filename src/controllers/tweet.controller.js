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

async function getById(req, res, next) {
    try {
        const { id } = req.params
        const response = await tweetService.getById(id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function retweet(req, res, next) {
    try {
        const { tweet_id, reply_id } = req.body
        if (!tweet_id && !reply_id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        else if (tweet_id) {
            const response = await tweetService.retweet(req.id, tweet_id, undefined)
            res.status(response.status).json(response)
        }
        else if (reply_id) {
            const response = await tweetService.retweet(req.id, undefined,reply_id)
            res.status(response.status).json(response)
        }
    }
    catch(err) {
        console.error(err)
        next(err)
    }
}

async function like(req, res, next) {
    try {
        const { tweet_id, reply_id } = req.body
        if (!tweet_id && !reply_id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        else if (tweet_id) {
            const response = await tweetService.like(req.id, tweet_id, undefined)
            res.status(response.status).json(response)
        }
        else if (reply_id) {
            const response = await tweetService.like(req.id, undefined,reply_id)
            res.status(response.status).json(response)
        }
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

async function reply(req, res, next) {
    try {
        const { reply_id, content } = req.body
        if (!reply_id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await tweetService.reply(req.id,reply_id, content)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err)
        next(err)
    }
}

async function getReplies(req, res, next) {
    try {
        const response = await tweetService.getReplies(req.id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err)
        next(err)
    }
}

async function getReplyById(req, res, next) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await tweetService.getReplyById(id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err)
        next(err)
    }
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