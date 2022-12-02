const userService = require('../services/user.service')

async function follow(req, res, next) {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await userService.follow(id, req.id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function unfollow(req, res, next) {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await userService.unfollow(id, req.id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const response = await userService.get(req.id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

module.exports = {
    follow,
    unfollow,
    get,
}