const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")
const Data = require("./model/stock")

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

app.listen(port, () => {
    console.log(`server live at port ${port}`)
})