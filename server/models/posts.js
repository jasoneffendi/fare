var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('./user')
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    member: {type: Schema.Types.ObjectId, ref: 'User'},
    created_date: {type: Date, default: Date.now },
    photo: String,
    description: String
})

var Post = mongoose.model('Post', PostSchema)

function get(req,res) {
    Post.find({})
    .populate('member')
    .then(response => {
        console.log(response)
        res.send(response)
    })
}

function post(req,res) {
    console.log(req.body)
    // res.send(req.body)
    var opentoken = jwt.verify(req.body.token, 'fare')
    console.log(opentoken)
    if(req.body.image !== '' && req.body.description !== '') {
        var newPost = new Post({
            member: opentoken._id,
            photo: req.body.image,
            description: req.body.description
        })

        newPost.save()
        .then((result,err) => {
            if(err) return res.send(err)

            res.send({
                result: result,
                message: 'post berhasil disimpan'
            })
        })

    }
}

function profile(req,res) {
    // var opentoken = jwt.verify(req.body.token, 'fare')
    // console.log(opentoken)
    User.find({_id: req.query.id})
    .then(result => {
        res.send(result)
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
    post,
    edit,
    del
}