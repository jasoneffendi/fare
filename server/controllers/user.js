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

    static edit(req,res) {
        User.edit(req,res)
    }

    static del(req,res) {
        User.del(req,res)
    }

    static getData(req,res) {
        User.getData(req,res)
    }
}

module.exports = userCtrl