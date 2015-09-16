var express = require('express');
var router = express.Router();
var apiResponse = require('../api/api-response.js');
var ApiHelpers = require('../api/api-helpers.js');

module.exports = function(controller, config) {
  var apiHelpers = ApiHelpers(config);

  /*
   * The endpoints for addon
   */
  /* GET Addon event. */
  router.get('/', function(req, res, next) {
    controller.create(req.eventData, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message, res);
        return res.sendApiSuccess(message, res);
    });
  });

  return router;
}
