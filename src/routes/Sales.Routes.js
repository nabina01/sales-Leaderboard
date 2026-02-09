const express = require("express")
const {
  addSale,
  getLeaderboard
} = require("../controller/Sales.Controller")

const router = express.Router()

router.post("/sales", addSale)
router.get("/leaderboard", getLeaderboard)

module.exports = router
