const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")
const { Stock, Watchlist } = require("./model/stock")
const User = require("./model/user")

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

//auth section
app.post("/register", async (req, res) => {
    let { username, email, password } = req.body
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        console.log("User already exists")
    }
    else {
        try {
            const newUser = new User({ username, email, password })
            await newUser.save()
            console.log("User successfully registered : ", newUser)
        } catch (err) {
            console.log("Registration failed : ", err)
            return res.json({ msg: err })
        }
    }
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if(!existingUser){
        console.log("User doesn't exist, signup instead")
    }
    else{
        if(password === existingUser.password){
            console.log("Successful login !!!")
        }
        else{
            console.log("Wrong Password !!!")
        }
    }
})

app.listen(port, () => {
    console.log(`server live at port ${port}`)
})