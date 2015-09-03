var express = require('express');
var router = express.Router();
var ApiHelpers = require('../api/api-helpers.js');

module.exports = function(controller, config) {
  var apiHelpers = ApiHelpers(config);
  /* GET api status. */
  router.get('/ping', function(req, res, next) {
    controller.ping(function(result) {
        res.send(result)
    });
  });

  return router;
}
