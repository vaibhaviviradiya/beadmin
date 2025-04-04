// const subcategory_model = require('../model/subcategory_model')
const category = require('../model/category_model')
var subcategory = require('../model/subcategory_model')
var multer = require('multer')

exports.sub_category = async(req,res)=>{
    try{
        req.body.picture = req.files.map(file=>(file.originalname))
        var cat_id = req.body.category_id = req.params.id
        var cat_data = await category.findById(cat_id).select()
        console.log(cat_data);
        req.body.category_name = cat_data.category_name
        
        
        var data =await subcategory.create(req.body)
        console.log(data);
        if(data)
        {
            res.status(200).json({
                status:true,
                message:"Subcategory add",
                data
            })
        }
        
    }
    catch(error)
    {
        res.status(401).json({
            status:false,
            error:error.message
        })
    }
}

exports.view_subcategory = async(req,res)=>{
    try{
        var data = await subcategory.find().populate('category_id', 'category_name');
        console.log();
        if(data)
        {
            res.status(200).json({
                status:true,
                data
            })
        }
    }
    catch(error)
    {
        res.status(401).json({
            status:false,
            error:error.message
        })
    }
}