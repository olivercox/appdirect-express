var express = require('express');
var router = express.Router();
var apiResponse = require('../api/api-response.js');
var ApiHelpers = require('../api/api-helpers.js');

module.exports = function(controller, config) {
  var apiHelpers = ApiHelpers(config);

  /*
   * The endpoints for user
   */
  /* GET Assign a user. */
  router.get('/assign', function(req, res, next) {
    controller.assign(req.eventData, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message, res);
        return res.sendApiSuccess(message, res);
    });
  });

  /* GET Unassign a user. */
  router.get('/unassign', function(req, res, next) {
    controller.unassign(req.eventData, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message, res);
        return res.sendApiSuccess(message, res);
    });
  });

  return router;
}
