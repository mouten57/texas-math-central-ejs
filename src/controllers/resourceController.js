const resourceQueries = require('../db/queries.resources');
const fs = require('fs');
const convertTimeStamp = require('../helpers/convertTimeStamp');
const pdfjs = require('pdfjs-dist');
const s3 = require('../config/aws-config');
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
  new(req, res, next) {
    res.render('resources/new');
  },
  create(req, res, next) {
    ////NEED TO HANDLE NON-FILE
    if (req.file !== undefined) {
      s3.upload(req.file, (err, link) => {
        let newResource = {
          name: req.body.name,
          unit: req.body.unit,
          type: req.body.type,
          link: req.body.link,
          description: req.body.description,
          _user: req.user,
          created: convertTimeStamp(Date.now()),
          file: req.file,
          s3Link: link
        };

        resourceQueries.addResource(newResource, (err, resource) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect(303, `/units/${resource.unit}/${resource._id}`);
          }
        });
        //delete upload
        if (req.file !== undefined) {
          fs.unlink(req.file.path, err => {
            if (err) throw err;
            console.log(`${req.file.originalname} was deleted.`);
          });
        }
      });
    } else {
      //no file. there has to be a better way to do this
      let newResource = {
        name: req.body.name,
        unit: req.body.unit,
        type: req.body.type,
        link: req.body.link,
        description: req.body.description,
        _user: req.user,
        created: convertTimeStamp(Date.now())
      };
      resourceQueries.addResource(newResource, (err, resource) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(303, `/units/${resource.unit}/${resource._id}`);
        }
      });
    }
  },
  show(req, res, next) {
    resourceQueries.getResource(req.params.resourceId, (err, resource) => {
      if (err || resource == null) {
        res.redirect(404, '/');
      } else {
        if (resource.file_data) {
          let downloadLink = `/units/${resource.unit}/${resource._id}/download`;
          resource.dl = downloadLink;
        }

        res.render('resources/show', { resource });
      }
    });
  },

  download(req, res, next) {
    resourceQueries.getResource(req.params.resourceId, (err, resource) => {
      console.log(resource);
      if (err || resource == null) {
        res.redirect(404, '/');
      } else {
        fs.writeFileSync(resource.file.path, resource.file_data, 'binary');

        var data = fs.readFileSync(resource.file.path);

        // res.contentType('application/pdf');
        // res.send(data);
        res.download(`./${resource.file.path}`, err => {
          if (err) {
            console.log(err);
          } else {
            //need to delete file after download is complete
            fs.unlink(resource.file.path, err => {
              if (err) {
                throw err;
              }
            });
          }
        });
      }
    });
  }
};
