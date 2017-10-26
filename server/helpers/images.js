const Multer = require('multer');
const Storage = require('@google-cloud/storage');
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
        next();
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