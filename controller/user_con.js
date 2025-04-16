const usermodel = require('../model/user_model')
var bcrypt = require('bcrypt')

exports.create_user = async (req, res) => {
    try {
        const { password } = req.body
        if (!password) {
            console.log("password is required");

        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const data = await usermodel.create(req.body)
        res.status(200).json({
            status: 'Success',
            Message: 'User Data Add Successfully',
            Data: data
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(401).json({
            status: 'Fail',
            Message: error.Message
        })
    }
}
exports.user_login = async (req, res) => {
    try {
        var username = req.body.username
        var password = req.body.password
        console.log("password = ", password);
        console.log("username = ", username);


        var data = await usermodel.findOne({ username })
        // console.log(user);

        //     console.log(user.password);
        if (data) {

            const pass = await bcrypt.compare(req.body.password, data.password)
            console.log(pass);

            if (!pass) {
                return res.status(200).json({
                    success: false,
                    message: "Invalid Password",
                });
            }

            res.status(200).json({
                status: 'Success',
                Message: 'user Login Successfully',
                Data: data
            })
        }
        else
        {
            res.status(200).json({
                success: false,
                message: "Wrong username",
            })
        }
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            status: 'Fail',
            Message: error.message
        })
    }
}
exports.view_user = async(req,res)=>{
    try{
        var data = await usermodel.find();
        console.log(data);
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