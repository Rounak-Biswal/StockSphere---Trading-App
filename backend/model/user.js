const mongoose = require("mongoose")
const { Watchlist, Stock } = require("./stock")
const { use } = require("react")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Password,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    portfolio: {
        stock: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Stock
        },
        quantity: {
            type: Number,
            default: 0
        },
        purchasePrice: {
            type: Number,
            default: 0
        }
    },
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Stock
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User