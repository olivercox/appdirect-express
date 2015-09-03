var express = require('express');
var router = express.Router();
var apiResponse = require('../api/api-response.js');
var ApiHelpers = require('../api/api-helpers.js');

module.exports = function(controller, config) {
  var apiHelpers = ApiHelpers(config);
  /*
   * Mock GET endpoints for the subscription API.
   * These are required for the ping tests in CF
   */

  /* GET Ping Create subscription */
  router.get('/*', function(req, res, next) {
    var result = '*** TEST *** ' + apiHelpers.getUserEventDescription(req.eventData)
    return res.sendApiSuccess(
      result, res)
  });

  /* GET home page. */
  router.post('/assign', function(req, res, next) {
    controller.assign(req.params.eventUrl, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message, res);
        return res.sendApiSuccess(message, res);
    });
  });

  /* GET home page. */
  router.post('/unassign', function(req, res, next) {
    controller.unassign(req.params.eventUrl, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message, res);
        return res.sendApiSuccess(message, res);
    });
  });

  return router;
}
