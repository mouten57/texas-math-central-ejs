const sharp = require('sharp');
const fs = require('fs');

module.exports = (req, res, next) => {
  if (req.file == undefined || req.file.mimetype !== 'image/jpeg') {
    next();
  } else {
    console.log('processImage');
    let images = [req.file.path];
    let promises = [];
    for (const image of images) {
      promises.push(
        new Promise((resolve, reject) => {
          sharp(image)
            .resize({ height: 400 })
            .toFile('src/uploads/output.jpg', err => {
              if (err) throw err;

              resolve();
            });
        })
      );
    }
    Promise.all(promises).then(() => next());
  }
};
