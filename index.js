const express = require('express')
const authRouter = require('./src/routes/auth.route')

const app = express()

app.use(express.json())


app.use("/api", authRouter)

app.listen(3000, () => {
    console.log("Listening on 3000")
})