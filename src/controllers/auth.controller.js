const authService = require('../services/auth.service')

async function register(req, res, next) {
    try {
        const { name, password, email, username } = req.body
        if (!name && !password && !email && !username) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await authService.register(name, password, email, username)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { username, password } = req.body
        if (!password && !username) {
            return res.status(400).json({"status": 400, "message": "bad request"})
        }
        const response = await authService.login(username, password)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function refreshToken(req, res, next) {
    try {
        const response = await authService.refreshToken(req.identity, req.id)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function delete_account(req, res, next) {
    try {
        const response = await authService.delete_account(req.identity)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    delete_account
}