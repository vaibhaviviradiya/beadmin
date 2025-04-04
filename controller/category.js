const category = require('../model/category_model')
const multer = require('multer')


exports.add_category = async(req,res)=>{
    try{
        
        req.body.picture = req.files.map(file=>(file.originalname)) 
        var data = await category.create(req.body)
        
        console.log(data);
        if(data)
        {
            res.status(200).json({
                status:true,
                message:"category add",
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

exports.view_category = async(req,res)=>{
    try{
        var data = await category.find()
        console.log(data);
        if(data)
        {
            res.status(200).json({
                status:"Success",
                data
            })
        }
        
    }
    catch(error)
    {
        res.status(401).json({
            status:"Fail",
            error:error.message
        })
    }
}