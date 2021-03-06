const resourceController = require('../controllers/resourceController');
const upload = require('../middlewares/multer').upload;
const processImage = require('../middlewares/processImage');

module.exports = app => {
  app.get('/units/:unit', resourceController.index);
  app.get('/units/:unit/:resourceId', resourceController.show);
  app.get('/resources/new', resourceController.new);
  app.post(
    '/resources/create',
    upload.single('file'),
    processImage,
    resourceController.create
  );
  app.post('/units/:unit/:resourceId/destroy', resourceController.destroy);
  app.get('/units/:unit/:resourceId/download', resourceController.download);
};
