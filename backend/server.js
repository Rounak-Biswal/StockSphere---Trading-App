const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")
const { Stock, Watchlist } = require("./model/stock")
const User = require("./model/user")
const { jwtAuthMiddleware, generateToken } = require("./auth")
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
    try {
        const newUser = new User({ username, email, password })
        const savedData = await newUser.save()

        const payload = {
            id: savedData.id,
            username: savedData.username
        }
        const token = generateToken(payload)

        res.status(200).json({ msg: "Registeration successful", response: savedData, token: token, payload: payload })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const existingUser = await User.findOne({ username })
        if (!existingUser || existingUser.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        const payload = {
            id: existingUser.id,
            username: existingUser.username
        }
        const token = generateToken(payload)

        res.json({ msg: "Login successful", response: existingUser, token: token })
    } catch (error) {
        res.status(401).json({ error: "Invalid server error" })
    }
})

//testing routes
app.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userPayload.id
        const currUser = await User.findById(userId)
        res.status(200).json({ currentUser: currUser })
    } catch (error) {
        res.status(401).json({ error: "Internal server error" })
    }
})

app.listen(port, () => {
    console.log(`server live at port ${port}`)
})