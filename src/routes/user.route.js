const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

router.use(verifyToken)

router.post("/follow", userController.follow)

router.post("/unfollow", userController.unfollow)

router.get("/get", userController.get)

module.exports = router