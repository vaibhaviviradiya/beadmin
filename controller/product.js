var product = require('../model/product_model')
var category = require('../model/category_model')
var subcategory = require('../model/subcategory_model')
var multer = require('multer')

exports.add_product = async(req,res)=>{
    try{
        req.body.picture = req.files.map(file=>(file.originalname))
        var sub_id = req.body.subcategory_id = req.params.id
        var subdata = await subcategory.findById(sub_id).select()
        console.log("subcategory data = "+subdata);
        req.body.subcategory_name = subdata.subcategory_name
        req.body.category_id = subdata.category_id
        req.body.category_name = subdata.category_name

        var data = await product.create(req.body)
        console.log(data);
        if(data)
        {
            res.status(200).json({
                status : true,
                message : "Product add",
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

exports.view_product = async(req,res)=>{
    try{
        var data = await product.find().populate('category_id', 'category_name').populate('subcategory_id','subcategory_name');
        console.log(data);
        if(data)
            {
                res.status(200).json({
                    status:true,
                    message:"Data add",
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
exports.view_one_product = async (req, res) => {
    try {
        const productId = req.params.id;

        // const data = await product.findById(productId).populate('category_id', 'category_name').populate('subcategory_id','subcategory_name');
        const data = await product.findById(productId);

        console.log(data);

        if (data) {
            res.status(200).json({
                status: true,
                message: "Product retrieved successfully",
                data
            });
        } else {
            res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
};
