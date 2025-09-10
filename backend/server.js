const dotenv = require("dotenv").config()
const express = require("express")
const bcrypt = require("bcrypt")
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
    res.status(200).json({ msg: "Home Route" });
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection successful");
        qrystr = {}
    } catch (e) {
        console.log("DB connection failed !! Retry");
    }
}

main();

//real routes
app.get("/stock/all", async (req, res) => {
    try {
        const stockData = await Stock.find()
        res.status(200).json(stockData);
    } catch (e) {
        console.log("something's wrong : ", e);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

app.get("/watchlist/all", async (req, res) => {
    try {
        const data = await Watchlist.find();
        console.log("watchlist data sent successfully");
        res.status(200).json(data);
    } catch (e) {
        console.log("Something's wrong : ", e);
        res.status(500).json({ error: "Failed to retrieve watchlist data." });
    }
});

app.post("/watchlist", async (req, res) => {
    try {
        const newWatchlistData = new Watchlist(req.body);
        const savedDoc = await newWatchlistData.save();
        console.log("stock added to watchlist");
        res.status(201).json({ msg: "Stock added to watchlist", data: savedDoc });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Something's wrong, watchlist not updated." });
    }
});

app.delete("/watchlist/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const deletedDoc = await Watchlist.findOneAndDelete({ symbol });
        if (deletedDoc) {
            console.log("stock removed from watchlist");
            res.status(200).json({ msg: "Stock removed from watchlist", data: deletedDoc });
        } else {
            res.status(404).json({ error: "Stock not found in watchlist." });
        }
    } catch (e) {
        console.log("Something's wrong : ", e);
        res.status(500).json({ error: "Failed to remove stock." });
    }
});

//auth section
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPW = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPW });
        const savedData = await newUser.save();

        const payload = {
            id: savedData.id,
            username: savedData.username
        };
        const token = generateToken(payload);

        res.status(201).json({ msg: "Registration successful", token: token });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(409).json({ error: "Username or email is already in use." });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (!existingUser || !await bcrypt.compare(password, existingUser.password)) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const payload = {
            id: existingUser.id,
            username: existingUser.username
        };
        const token = generateToken(payload);

        res.status(200).json({ msg: "Login successful", token: token });
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//testing routes
app.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userPayload.id;
        const currUser = await User.findById(userId);
        if (!currUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json({ currentUser: currUser });
    } catch (error) {
        console.error("Profile route error:", error);
        // Fix: A server error is a 500, not a 401
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use((err, req, res, next) => {
    console.error('💥 Caught error:', err.stack || err);
    res.status(500).json({ error: err.message });
});


app.listen(port, () => {
    console.log(`server live at port ${port}`)
})