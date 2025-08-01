const mongoose = require("mongoose");
const Stock = require("../model/stock");
require("dotenv").config({ path: "../.env" });
console.log(process.env.MONGO_URL)

async function updateStocks() {
  await mongoose.connect(`${process.env.MONGO_URL}`);

  const symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NFLX", "NVDA",
    "WMT", "MCD", "JNJ", "UNH", "CAT", "INTC", "ORCL", "ADBE"
  ];

  try {
    for (let symbol of symbols) {
      const stock = await Stock.findOne({ symbol })
      await Stock.updateOne(
        { symbol },
        {
          $set: {
            trend: (100 * (parseFloat(stock.history[0].close) - parseFloat(stock.history[1].close)) / parseFloat(stock.history[0].close))
          }
        }
      )
    }
    console.log("DB updated")
  } catch (e) {
    console.log("Something's wrong : ", e)
  }

}

updateStocks();
