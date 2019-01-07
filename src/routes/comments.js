const commentController = require('../controllers/commentController');

module.exports = app => {
  app.post(
    '/api/units/:unit/:resourceId/comments/create',
    commentController.create
  );

  app.post(
    '/api/units/:unit/:resourceId/comments/:commentId/destroy',
    commentController.destroy
  );
};
