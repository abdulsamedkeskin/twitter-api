const express = require('express')
const authRouter = require('./src/routes/auth.route')
const tweetRouter = require('./src/routes/tweet.route')

const app = express()

app.use(express.json())


app.use("/auth", authRouter)
app.use("/tweet", tweetRouter)

app.listen(3000, () => {
    console.log("Listening on 3000")
})