const unitController = require('../controllers/unitController');

module.exports = app => {
  app.get('/units', unitController.index);
};
