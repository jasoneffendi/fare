var Post = require('../models/posts')

class postCtrl{
    static get(req,res) {
        Post.get(req,res)
    }

    static post(req,res) {
        Post.post(req,res)
    }

    static delete(req,res) {
        Post.del(req,res)
    }

    static profile(req,res) {
        Post.ownPosts(req,res)
    }
}

module.exports = postCtrl