const express = require('express')
const router = require('./Utils/router')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const mongoConnection = process.env.MONGO_URI

const app = express()

mongoose.connect(mongoConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false    
}, () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 3333, () => console.log('Server running'))