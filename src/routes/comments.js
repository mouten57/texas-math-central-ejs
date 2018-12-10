module.exports = app => {
  app.get('/comments', (req, res) => {
    res.send('COMMENTS PAGE');
  });
};
