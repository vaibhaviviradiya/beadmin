const mongoose = require('mongoose');

const subcategory = new mongoose.Schema({
    subcategory_name :{
        type : String,
        required : true
    },
    picture : {
        type:[String]
    },
    category_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    category_name : {
        type:String,
        ref:"category"
    }
})
module.exports = mongoose.model('subcategory',subcategory)