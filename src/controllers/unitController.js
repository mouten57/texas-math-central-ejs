const unitQueries = require('../db/queries.units');

module.exports = {
  index(req, res, next) {
    unitQueries.getAllUnits((err, units) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        res.render('units/index', { units });
      }
    });
  }
};
