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
    .catch(err => {
        res.send(err)
    })
}

function ownPosts(req,res) {
    console.log(req.body)
    var opentoken = jwt.verify(req.body.token, 'fare')
    console.log(opentoken)
    Post.find({member: opentoken._id})
    .then(posts => {
        res.send(posts)
    })
    .catch(err => {
        res.send(err)
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
            photo: req.body.photo,
            description: req.body.description
        })


        console.log(newPost)
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

function del(req,res) {
    Post.findOneAndRemove({_id: req.body.id})
    .then(post => {
        res.send(post)
    })
}

module.exports = {
    get,
    post,
    del,
    ownPosts
}