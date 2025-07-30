const dotenv = require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const Stock = require("../model/stock")
// const fetch = require("node-fetch")
const port = 5100
const app = express()

app.use(express.json())

async function main() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("DB connection successful")
    } catch (e) {
        console.log("Error connecting to DB : ", e)
    }
}

main()

//stock data insertion into MONGODB
app.get("/getData", async (req, res) => {
    try {
        const stockSymbols = [
            "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NFLX", "NVDA", "JPM", "DIS"
        ];

        for (symbol of stockSymbols) {
            const rawData = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${process.env.API_KEY}`)
            const data = await rawData.json()

            const transformedData = {
                symbol,
                meta: {
                    interval: data.meta.interval,
                    currency: data.meta.currency,
                    exchange_timezone: data.meta.exchange_timezone,
                    exchange: data.meta.exchange,
                    mic_code: data.meta.mic_code,
                    type: data.meta.type,
                },
                history: data.values
            }

            const doc = new Stock(transformedData)
            await doc.save()
        }

        console.log("Data fetched and saved successfully")
        res.send("Data fetched and saved successfully")
    } catch (e) {
        console.log("something's wrong, ", e)
        res.send("something's wrong, ", e)
    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})