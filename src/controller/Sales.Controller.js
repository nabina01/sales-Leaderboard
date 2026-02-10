const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Add sales record
exports.addSale = async (req, res) => {
  const { agentName, amount, saleDate } = req.body

  if (!agentName || !amount) {
    return res.status(400).json({
      success: false,
      message: "agentName and amount are required"
    })
  }

  try {
    const sale = await prisma.sale.create({
      data: {
        agentName,
        amount: Number(amount),
        createdAt: saleDate ? new Date(saleDate) : new Date()
      }
    })

    res.status(201).json({
      success: true,
      message: "Sale added successfully",
      sale
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add sale"
    })
  }
}

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const { date } = req.query
    const whereClause = {}
    if (date) {
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)
      
      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)
      
      whereClause.createdAt = {
        gte: startDate,
        lte: endDate
      }
    }

    const aggregated = await prisma.sale.groupBy({
      by: ["agentName"],
      where: whereClause,
      _sum: {
        amount: true
      },
      _count: {
        id: true
      },
      orderBy: {
        _sum: {
          amount: "desc"
        }
      }
    })
    let rank = 0
    let prevSales = null

    const leaderboard = aggregated.map((item, index) => {
      const totalSales = item._sum.amount

      if (totalSales !== prevSales) {
        rank = index + 1
      }

      prevSales = totalSales

      return {
        rank,
        name: item.agentName,
        totalSales,
        totalDeals: item._count.id
      }
    })

    res.json({
      date: date || new Date().toISOString().split("T")[0],
      leaderboard
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard"
    })
  }
}
