const order_model = require('../model/order_model');
const order = require('../model/order_model')
const mongoose = require('mongoose')

exports.create_order = async(req,res)=>{
    try{
        var orderdata = req.body;
        var neworder = new order(orderdata)
        var savedorder = await neworder.save();
        res.status(200).json({
            success: true,
            message: 'Order saved successfully',
            orderId: savedorder._id
          });
    }
    catch(error)
    {
        console.error('Error saving order:', error);
        res.status(401).json({
          success: false,
          message: 'Failed to save order',
          error: error.message
        });
    }
}
exports.view_order = async(req,res)=>{
  try{
      var orderdata = await order_model.find()
      console.log(orderdata);
      if(orderdata)
      {
        res.status(200).json({
          success:true,
          Data:orderdata
        })
      }
      
  }
  catch(error)
  {
    res.status(401).json({
      success: false,
      message: 'fail to view orders',
      error: error.message
    });
  }
}
exports.cancel_order = async(req,res)=>{
  try
  {
    var orderid = req.params.id
    var data = order_model.findByIdAndDelete(orderid)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: result,
    });
  }
  catch(error)
  {
    res.status(401).json({
      success: false,
      message: 'fail to view orders',
      error: error.message
    });
  }
}