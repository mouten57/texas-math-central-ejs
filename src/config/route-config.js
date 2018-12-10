module.exports = {
  init(app) {
    if (process.env.NODE_ENV === 'test') {
      const mockAuth = require('../../spec/support/mock-auth.js');
      mockAuth.fakeIt(app);
    }
    require('../routes/static')(app);
    require('../routes/auth')(app);
    require('../routes/users')(app);
    require('../routes/units')(app);
    require('../routes/comments')(app);
    require('../routes/resources')(app);
    require('../routes/voting')(app);
  }
};
