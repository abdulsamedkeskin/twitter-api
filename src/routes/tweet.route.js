const express = require('express')
const router = express.Router()
const tweetController = require('../controllers/tweet.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

router.use(verifyToken)

router.post("/create", tweetController.create)

router.patch("/update", tweetController.update)

router.get("/get", tweetController.get)

router.get("/get/:id", tweetController.getById)

router.post("/retweet", tweetController.retweet)

router.post("/retweet/undo", tweetController.undoRetweet)

router.get("/retweets", tweetController.getRetweets)

router.get("/retweet/:id", tweetController.getRetweetById)

router.post("/like", tweetController.like)

router.post("/like/undo", tweetController.undoLike)

router.get("/likes", tweetController.getLikes)

router.get("/like/:id", tweetController.getLikeById)

router.delete("/delete", tweetController.delete_)

router.post("/reply", tweetController.reply)

router.get("/reply/:id", tweetController.getReplyById)

router.get("/replies", tweetController.getReplies)

module.exports = router