const resourceController = require('../controllers/resourceController');

const mongoose = require('mongoose');
const Resource = mongoose.model('resources');

module.exports = app => {
  app.get('/units/:unit', resourceController.index);
  app.get('/units/:unit/:resourceId', resourceController.show);

  app.get('/units/:unit/:resourceId/download', resourceController.download);
};
