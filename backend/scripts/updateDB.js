const mongoose = require("mongoose");
const Stock = require("../model/stock");
require("dotenv").config({path:"../.env"});
console.log(process.env.MONGO_URL)

async function updateStocks() {
  await mongoose.connect(`${process.env.MONGO_URL}`);

  const updates = [
  { symbol: "AAPL", stockName: "Apple Inc.", sector: "Technology", marketCap: 2900 },
  { symbol: "MSFT", stockName: "Microsoft Corporation", sector: "Technology", marketCap: 2700 },
  { symbol: "GOOGL", stockName: "Alphabet Inc.", sector: "Technology", marketCap: 1900 },
  { symbol: "AMZN", stockName: "Amazon.com, Inc.", sector: "Consumer Discretionary", marketCap: 1900 },
  { symbol: "TSLA", stockName: "Tesla, Inc.", sector: "Consumer Discretionary", marketCap: 850 },
  { symbol: "META", stockName: "Meta Platforms, Inc.", sector: "Communication Services", marketCap: 1300 },
  { symbol: "NFLX", stockName: "Netflix, Inc.", sector: "Communication Services", marketCap: 280 },
  { symbol: "NVDA", stockName: "NVIDIA Corporation", sector: "Technology", marketCap: 3100 },
  { symbol: "WMT", stockName: "Walmart Inc.", sector: "Consumer Staples", marketCap: 510 },
  { symbol: "MCD", stockName: "McDonald's Corporation", sector: "Consumer Discretionary", marketCap: 210 },
  { symbol: "JNJ", stockName: "Johnson & Johnson", sector: "Healthcare", marketCap: 390 },
  { symbol: "UNH", stockName: "UnitedHealth Group Inc.", sector: "Healthcare", marketCap: 480 },
  { symbol: "CAT", stockName: "Caterpillar Inc.", sector: "Industrials", marketCap: 180 },
  { symbol: "INTC", stockName: "Intel Corporation", sector: "Technology", marketCap: 130 },
  { symbol: "ORCL", stockName: "Oracle Corporation", sector: "Technology", marketCap: 360 },
  { symbol: "ADBE", stockName: "Adobe Inc.", sector: "Technology", marketCap: 230 },
  { symbol: "UBER", stockName: "Uber Technologies, Inc.", sector: "Technology", marketCap: 130 }
];


  for (const update of updates) {
    await Stock.updateOne(
      { symbol: update.symbol },
      {
        $set: {
          stockName: update.stockName,
          sector: update.sector,
          marketCap: update.marketCap,
        },
      }
    );
  }

  console.log("Stock data updated");
  mongoose.disconnect();
}

updateStocks();
