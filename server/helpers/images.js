const Multer = require('multer');
const Storage = require('@google-cloud/storage');
const Vision = require('@google-cloud/vision');
const vision = new Vision({
  project_id: 'strong-pursuit-183907',
  private_key_id: '4fc9e5043ab70f0c5f96109385243ecbe9181008',
  keyFilename:  'keyfile.json'
});
const storage = Storage({
    projectId: 'strong-pursuit-183907',
    keyFilename: 'keyfile.json'
});
const bucket = storage.bucket('fare-storage');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

function sendUploadToGCS (req, res, next) {
    if (!req.file) {
      return next();
    }
  
    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);
    // console.log(file)
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
  
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        console.log('done')
        const request = {
          source: {
            imageUri: req.file.cloudStoragePublicUrl
          }
        }

        vision.labelDetection(request)
        .then((results) => {
          const labels = results[0].labelAnnotations;
          console.log('Labels:');
          req.file.labels = labels
          next();          
          // labels.forEach((label) => console.log(label));
        })
        .catch((err) => {
          console.error('ERROR:', err);
        });
      });
    });
  
    stream.end(req.file.buffer);
  }


function getPublicUrl (filename) {
    return `https://storage.googleapis.com/fare-storage/${filename}`;
}
module.exports = {
    multer,
    sendUploadToGCS,
    getPublicUrl
}