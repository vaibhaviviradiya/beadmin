const mongoose = require('mongoose')
const adminlogin = new mongoose.Schema({
    Username : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('AdminLogin',adminlogin)