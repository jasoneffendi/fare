var Post = require('../models/posts')

class postCtrl{
    static get(req,res) {
        Post.get(req,res)
    }

    static post(req,res) {
        Post.post(req,res)
    }
}

module.exports = postCtrl