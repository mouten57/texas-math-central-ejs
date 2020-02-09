const commentController = require('../controllers/commentController');

module.exports = app => {
  app.post(
    '/units/:unit/:resourceId/comments/create',
    commentController.create
  );

  app.post(
    '/units/:unit/:resourceId/comments/:commentId/destroy',
    commentController.destroy
  );
};
