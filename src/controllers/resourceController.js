const resourceQueries = require('../db/queries.resources');
const fs = require('fs');

module.exports = {
  index(req, res, next) {
    resourceQueries.getUnitResources(req.params.unit, (err, resources) => {
      if (err || resources == null) {
        res.redirect(404, '/');
      } else {
        res.render('units/show', { resources });
      }
    });
  },
  show(req, res, next) {
    resourceQueries.getResource(req.params.resourceId, (err, resource) => {
      if (err || resource == null) {
        res.redirect(404, '/');
      } else {
        if (resource.file_data) {
          let downloadLink = `/units/${resource.unit}/${resource._id}/download`;
          resource.dl = downloadLink;
          console.log(resource.dl);
        }

        res.render('resources/show', { resource });
      }
    });
  },

  download(req, res, next) {
    resourceQueries.getResource(req.params.resourceId, (err, resource) => {
      if (err || resource == null) {
        res.redirect(404, '/');
      } else {
        let buffer = new Buffer(resource.file_data.buffer);
        fs.writeFile(resource.file_path, buffer, err => {
          if (err) throw err;
          console.log('success!!!!!!');
          res.download('./' + resource.file_path);
          // fs.unlinkSync(`./${resource[0].file_path}`);
          //need to delete file after download is complete
        });
      }
    });
  }
};
