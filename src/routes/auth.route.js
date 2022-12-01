const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { verifyToken, verifyRefreshToken } = require('../middlewares/auth.middleware')

router.use("/delete",verifyToken)
router.use("/refresh",verifyRefreshToken)

router.post("/register", authController.register)

router.post("/login", authController.login)

router.post("/refresh", authController.refreshToken)

router.delete("/delete", authController.delete_account)

module.exports = router