require("dotenv").config()
const express = require("express")
const cors = require("cors")

const salesRoutes = require("./src/routes/Sales.Routes")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api", salesRoutes)

app.get("/", (req, res) => {
  res.send("Sales Leaderboard API running 🚀")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
