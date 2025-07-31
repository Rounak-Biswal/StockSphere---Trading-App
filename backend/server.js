const dotenv = require("dotenv").config()
console.log(process.env.MONGO_URL)
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")
const Stock = require("./model/stock")

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
app.get("/stock/all", async (req, res) => {
    try {
        const stockData = await Stock.find()
        res.send(stockData)
    } catch (e) {
        console.log("something's wrong : ", e)
        res.send("something's wrong : ", e)
    }
})

app.listen(port, () => {
    console.log(`server live at port ${port}`)
})