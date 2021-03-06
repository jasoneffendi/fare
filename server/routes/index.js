var express = require('express');
var cors = require('cors')
var router = express.Router();
var images = require('../helpers/images.js')
var postCtrl = require('../controllers/posts')

router.use(cors())

/* GET home page. */
router.get('/', postCtrl.get);

router.post( '/upload',
images.multer.single('image'),
images.sendUploadToGCS,
(req, res, next) => {
  let data = req.body;

  // Was an image uploaded? If so, we'll use its public URL
  // in cloud storage.
  var labels = []
  req.file.labels.forEach(data => {
    labels.push(data.description)
  })
  console.log(labels)
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
    data.label = labels
  }
  res.send({
    url: req.file.cloudStoragePublicUrl,
    label: labels
  })
  // Save the data to the database.
});

router.post('/post', postCtrl.post);

router.delete('/post', postCtrl.delete);

router.post('/profile', postCtrl.profile)

module.exports = router;
