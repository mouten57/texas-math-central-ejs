const validation = require('./validation');

const userController = require('../controllers/userController');

module.exports = app => {
  app.get('/users/sign_up', (req, res) => {
    res.send('GET user signup');
  });
  app.post('/users/sign_up', validation.validateUsers, (req, res) => {
    res.send('POST user signup');
  });
  app.get('/users/sign_in', (req, res) => {
    res.send('GET user sign in');
  });
  app.post('/users/sign_in', validation.validateUsers, (req, res) => {
    res.send('POST user sign in');
  });
  app.get('/users/sign_out', (req, res) => {
    res.send('GET sign in');
  });
  app.get('/profile', userController.show);
};
