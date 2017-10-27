var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: String,
    email: String
})

var User =  mongoose.model('User', UserSchema)

function get(req,res) {
    User.find({})
    .then(data => {
        res.send(data)
    })
    // res.send('hello ini user')
}

function register(req,res) {
    User.findOne({name: req.body.name})
    .then(user => {
        if(req.body.user !== '' && req.body.password !== '' && req.body.email !== '' && user == null) {
            var newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
        
            newUser.save()
            .then((result,err) => {
                res.send({
                    result: result,
                    message: 'save user berhasil'
                })
            })
        } else if(user !== null) {
            res.send({
                duplicate: true,
                fields: false
            })
        } else {
            res.send({
                duplicate: false,
                fields: true
            })
        }
    })
}

function login(req,res) {
    User.findOne({name: req.body.name})
    .then(user => {
        console.log(user)
        if(req.body.password == user.password) {
            var token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email
            }, 'fare');
            return res.send(token)
        }
        res.send(false)
    })
}

function edit(req,res) {
    var opentoken = jwt.verify(req.body.token, 'fare')
    console.log(opentoken)
    User.findOne({name: req.body.name})
    .then(user => {
        if(req.body.user !== '' && req.body.password !== '' && req.body.email !== '' && user == null) {
            User.findOneAndUpdate({_id: opentoken._id}, {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            .then((result,err) => {
                if(err) return res.send(err)

                res.send(result)
            })
        } else {
            res.send(false)
        }
    })
    .catch(err => {
        res.send(err)
    })
}


function del(req,res) {
    var opentoken = jwt.verify(req.body.token, 'fare')
    console.log(opentoken)
    User.findOneAndRemove({_id: opentoken._id})
    .then(response => {
        res.send({
            message: 'delete user berhasil'
        })
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports = {
    get,
    register,
    login,
    edit,
    del
}