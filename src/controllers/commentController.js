const commentQueries = require('../db/queries.comments');
const convertTimeStamp = require('../helpers/convertTimeStamp');

module.exports = {
  create(req, res, next) {
    const newComment = {
      //resource added in with query using resource_id
      resource_id: req.params.resourceId,
      posted: convertTimeStamp(Date.now()),
      _user: req.user,
      body: req.body.body
    };
    commentQueries.createComment(newComment, (err, comment) => {
      if (err) {
        res.send(err);
      }

      res.redirect(req.headers.referer);
    });
  },

  destroy(req, res, next) {
    commentQueries.deleteComment(req.params.commentId, (err, comment) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
};
