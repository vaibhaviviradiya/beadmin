const mongoose  = require('mongoose')

const product = new mongoose.Schema({
    product_name : {
        type : String,
        required : true
    },
    picture : {
        type : [String]
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String
    },
    color : {
        type : [String]
    },
    material : {
        type : String
    },
    category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    category_name : {
        type : String
    },
    subcategory_id : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "subcategory"
    },
    subcategory_name : {
        type : String
    }
})

module.exports = mongoose.model('product',product)