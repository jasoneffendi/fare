var User = require('../models/user')

class userCtrl{
    static get(req,res) {
        User.get(req,res)
    }

    static register(req,res) {
        User.register(req,res)
    }

    static login(req,res) {
        User.login(req,res)
    }
}

module.exports = userCtrl