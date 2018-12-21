require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieSession = require('cookie-session');
const flash = require('express-flash');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');

//important to call model first, before I try to run passport
require('../db/models/User');
require('../db/models/Resource');
require('../db/models/Comment');

const keys = require('./keys/keys');
require('./passport-config');

module.exports = {
  init(app, express) {
    mongoose.connect(keys.mongoURI);
    app.set('views', viewsFolder);
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(
      cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
      })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });
    app.use(express.static(path.join(__dirname, '..', 'assets')));
    app.use(logger('dev'));
  }
};
