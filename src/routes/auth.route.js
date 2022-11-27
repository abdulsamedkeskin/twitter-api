const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.use("/delete",verifyToken)

router.post("/register", authController.register)

router.post("/login", authController.login)

router.delete("/delete", authController.delete_account)

module.exports = router