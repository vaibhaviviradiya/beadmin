const admin_model = require('../model/admin_model')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.create_admin = async (req, res) => {
    try {
        req.body.Password = await bcrypt.hash(req.body.Password, 10)
        const data = await admin_model.create(req.body)
        res.status(200).json({
            status: 'Success',
            Message: 'Admin Data Add Successfully',
            Data: data
        })
    }
    catch (error) {
        console.error(error.Message);
        res.status(401).json({
            status: 'Fail',
            Message: error.Message
        })
    }
}

exports.admin_login = async (req, res) => {
    try {
        const username = await admin_model.findOne({ Username: req.body.Username })
        if (!username) throw new Error('Invalid Username')

        const pass = await bcrypt.compare(req.body.Password, username.Password)
        if (!pass) throw new Error('Invalid Password')

        res.status(200).json({
            success: true,
            Message: 'Admin Login Successfully',
            Data: username
        })
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            Message: error.Message
        })
    }
}