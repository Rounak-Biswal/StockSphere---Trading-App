const mongoose = require("mongoose")

const dailyDataSchema = new mongoose.Schema({
  datetime: String,
  open: String,
  high: String,
  low: String,
  close: String,
  volume: String,
}, { _id: false });

const metaSchema = new mongoose.Schema({
  interval: String,
  currency: String,
  exchange_timezone: String,
  exchange: String,
  mic_code: String,
  type: String,
}, { _id: false });

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  stockName: String,
  sector: String,
  marketCap: Number,
  trend: Number,
  logoURL: String,
  meta: metaSchema,
  history: [dailyDataSchema]
})

const Stock = mongoose.model("Stock", stockSchema)
module.exports = Stock;