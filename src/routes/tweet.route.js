const express = require('express')
const router = express.Router()
const tweetController = require('../controllers/tweet.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

router.use(verifyToken)

router.post("/create", tweetController.create)

router.patch("/update", tweetController.update)

router.get("/get", tweetController.get)

router.delete("/delete", tweetController.delete_tweet)

module.exports = router