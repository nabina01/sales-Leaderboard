# Sales Leaderboard Backend

## Tech Stack
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Features
- Add sales records with optional date tracking
- Aggregate total sales per agent
- Rank agents based on total sales
- Handles ties consistently
- Filter leaderboard by date

## API Endpoints

### Add Sale
```bash
POST /api/sales
{
  "agentName": "Ram Sharma",
  "amount": 250000,
  "saleDate": "2026-02-10" // Optional - defaults to current date
}
```

### Get Leaderboard
```bash
GET /api/leaderboard
GET /api/leaderboard?date=2026-02-10  // Filter by specific date
```

Response:
```json
{
  "date": "2026-02-10",
  "leaderboard": [
    {
      "rank": 1,
      "name": "Ram Sharma",
      "totalSales": 500000,
      "totalDeals": 12
    },
    {
      "rank": 2,
      "name": "Sita Karki",
      "totalSales": 420000,
      "totalDeals": 15
    }
  ]
}
```

## Ranking Logic
Agents are ranked by total sales in descending order.
If two agents have the same total sales, they share the same rank.

## Setup Instructions

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL

# Run database migrations
npx prisma migrate dev

# Start the server
npm start
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Railway (Recommended)
1. Fork/push this repo to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add PostgreSQL database
5. Deploy automatically

## Live URL
**🚀 To be updated after deployment**

Follow the deployment guide in [DEPLOYMENT.md](DEPLOYMENT.md) to deploy your application and update this URL.

