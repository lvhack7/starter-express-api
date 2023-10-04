require('dotenv').config();

const express = require('express')
const cors = require('cors')
const db = require('./db')
const router = require('./routes')

const app = express()
const PORT = process.env.PORT || 7500

app.use(express.json())
app.use(cors())
app.use('/api', router)

async function startServer () {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

startServer()