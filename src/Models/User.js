const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
    ,
    site: {
        type: String
    }
})

module.exports = mongoose.model('User', Schema)