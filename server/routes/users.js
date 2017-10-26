var express = require('express');
var cors = require('cors')
var router = express.Router();
var userCtrl = require('../controllers/user')

router.use(cors())

/* GET users listing. */
router.get('/', userCtrl.get);

router.post('/', userCtrl.register);

router.post('/login', userCtrl.login);

module.exports = router;
