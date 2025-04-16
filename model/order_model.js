const mongoose = require('mongoose')
const order = new mongoose.Schema({
    orderid: String,
    orderdate: String,
    username: String,
    email: String,
    contact: String,
    orderitems: [{
        productid: String,
        productname: String,
        price: Number,
        quantity: Number,
        color: String,
        picture: String
    }],
    subtotal: Number,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('ordertb',order)