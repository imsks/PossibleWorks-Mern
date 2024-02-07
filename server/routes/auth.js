// routes/auth.js
const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")

// User registration
router.post("/register", async (req, res) => {
    try {
        const { Username, Password, Email, UserType } = req.body
        const PasswordHash = await bcrypt.hash(Password, 10)
        const UserID = uuidv4()

        const user = new User({
            UserID,
            Username,
            PasswordHash,
            Email,
            UserType
        })

        await user.save()

        res.status(201).json({
            status: true,
            message: "User registered successfully"
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, error: "Registration failed" })
    }
})

// User login
router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body
        const user = await User.findOne({ Username })

        if (!user) {
            return res
                .status(401)
                .json({ status: false, error: "Authentication failed" })
        }

        const passwordMatch = await bcrypt.compare(Password, user.PasswordHash)
        console.log("HERE", user, passwordMatch)

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ status: false, error: "Authentication failed" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(200).json({ status: true, token })
    } catch (error) {
        console.log("HERE", error)
        res.status(500).json({ status: false, error: "Login failed" })
    }
})

module.exports = router
