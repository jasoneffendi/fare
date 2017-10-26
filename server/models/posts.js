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

module.exports = {
    get,
    post
}