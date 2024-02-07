const express = require("express")
const router = express.Router()
const Todo = require("../models/Task")
const { v4: uuidv4 } = require("uuid")

// Create a Todo
router.post("/", async (req, res) => {
    try {
        const {
            UserID,
            Title,
            Description,
            Priority,
            Status,
            CreationDate,
            DueDate,
            Tags
        } = req.body

        const TaskID = uuidv4()
        const todos = await Todo.create({
            TaskID,
            UserID,
            Title,
            Description,
            Priority,
            Status,
            CreationDate,
            DueDate,
            Tags
        })
        if (!todos) {
            return res.status(400).json({
                success: false,
                message: "Problem creating Todo",
                todo: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Successfully created Todo",
            todo: todos
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Get all Todos
router.get("/", async (req, res) => {
    //this will return all the data, exposing only the id and todo field to the client
    try {
        const todos = await Todo.find()
        if (!todos) {
            return res.status(400).json({
                success: false,
                message: "Todos not retrieved",
                todos: []
            })
        }
        return res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            todos: todos
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Update a Todo
router.patch("/:id", async (req, res) => {
    console.log("HERE", req.params.id)
    try {
        const {
            UserID,
            Title,
            Description,
            Priority,
            Status,
            CreationDate,
            DueDate,
            Tags
        } = req.body
        const update = await Todo.findOneAndUpdate(
            { TaskID: req.params.id },
            {
                UserID,
                Title,
                Description,
                Priority,
                Status,
                CreationDate,
                DueDate,
                Tags
            }
        )
        if (!update) {
            return res.status(400).json({
                success: false,
                message: "Not successfully updated"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Todo successfully updated"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Delete a Todo
router.delete("/:id", async (req, res) => {
    try {
        const deleteTodo = await Todo.findOneAndDelete({
            TaskID: req.params.id
        })
        if (!deleteTodo) {
            return res.status(400).json({
                success: false,
                message: "Todo not deleted"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Todo successfully deleted"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router
