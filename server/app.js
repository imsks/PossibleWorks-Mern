const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const app = express()
const authRoutes = require("./routes/auth")

app.use(express.json())
app.use(cors())

// Define routes
app.get("/", (req, res) => {
    res.send("Hello, Express!")
})

app.use("/auth", authRoutes)

// Start the server
const port = process.env.PORT || 3000

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`)
})
