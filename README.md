# Sales Leaderboard Backend

## Tech Stack
- Node.js
- Express.js
- Prisma ORM
-  PostgreSQL

## Features
- Add sales records
- Aggregate total sales per agent
- Rank agents based on total sales
- Handles ties consistently

## API Endpoints

### Add Sale
POST /api/sales
{
  "agentName": "Ram Sharma",
  "amount": 250000
}

### Get Leaderboard
GET /api/leaderboard

## Ranking Logic
Agents are ranked by total sales in descending order.
If two agents have the same total sales, they share the same rank.

## Setup Instructions
npm install  
npx prisma migrate dev  
npm start

## Live URL
<your deployed link here>
