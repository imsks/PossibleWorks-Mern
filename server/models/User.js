// models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    UserID: { type: String, unique: true, required: true },
    Username: { type: String, required: true },
    PasswordHash: { type: String, required: true },
    Email: { type: String, required: true },
    UserType: { type: String, required: true },
})

module.exports = mongoose.model('User', userSchema)