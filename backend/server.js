const dotenv = require("dotenv").config()
console.log(process.env.MONGO_URL)
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")
const { Stock, Watchlist } = require("./model/stock")

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json({ msg: "Home Route" })
})

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection successful")
    } catch (e) {
        console.log("DB connection failed !! Retry")
    }
}

main();

//real routes
//get all stock data
app.get("/stock/all", async (req, res) => {
    try {
        const stockData = await Stock.find()
        res.send(stockData)
    } catch (e) {
        console.log("something's wrong : ", e)
        res.send("something's wrong : ", e)
    }
})

app.get("/watchlist/all", async (req, res) => {
    try {
        const data = await Watchlist.find()
        console.log("watchlist data sent successfully")
        res.send(data);
    } catch (e) {
        console.log("Something's wrong : ", e)
    }
})

app.post("/watchlist", async (req, res) => {
    try {
        const newWatchlistData = new Watchlist(req.body);
        const savedDoc = await newWatchlistData.save();
        console.log("stock added to watchlist");
        res.send(savedDoc)
    } catch (e) {
        console.log(e)
        res.send("Something's wrong\nwatchlist not updated")
    }

})

app.delete("/watchlist/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        await Watchlist.findOneAndDelete({ symbol })
        console.log("stock removed from watchlist")
    } catch (e) {
        console.log("Something's wrong : ", e)
    }
})

app.listen(port, () => {
    console.log(`server live at port ${port}`)
})