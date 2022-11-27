const tweetService = require('../services/tweet.service')

async function create(req, res, next) {
    try {
        const text = req.body?.text
        const response = await tweetService.create(req.identity, text)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = req.body?.id
        const text = req.body?.text
        const response = await tweetService.update(req.identity, id, text)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const response = await tweetService.get(req.identity)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function delete_tweet(req, res, next) {
    try {
        const id = req.body?.id
        const response = await tweetService.delete_tweet(req.identity, id)
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
    delete_tweet
}