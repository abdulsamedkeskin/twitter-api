const authService = require('../services/auth.service')

async function register(req, res, next) {
    try {
        const username = req.body?.username
        const password = req.body?.password
        const response = await authService.register(username, password)
        res.status(response.status).json(response)
    }
    catch(err) {
        console.error(err.message);
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const username = req.body?.username
        const password = req.body?.password
        const response = await authService.login(username, password)
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
    delete_account
}