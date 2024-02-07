// models/User.js
const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    TaskID: { type: String, unique: true, required: true },
    UserID: { type: String, required: true },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Priority: { type: String, required: true },
    Status: { type: String, required: true },
    CreationDate: { type: String, required: true },
    DueDate: { type: String, required: true },
    Tags: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("Task", taskSchema)
