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
    var result = '*** TEST *** ' + apiHelpers.getEventDescription(req.eventData)
    return res.sendApiSuccess(
      result)
  });

  /*
   * The real POST endpoints for subscription
   */
  /* POST Create a subscription. */
  router.post('/create', function(req, res, next) {
    controller.create(req.params.eventUrl, function(err, result) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiResponse(result);
    });
  });

  /* GET home page. */
  router.post('/change', function(req, res, next) {
    controller.change(req.params.eventUrl, function(err, result) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiSuccess(result);
    });
  });

  /* GET home page. */
  router.post('/cancel', function(req, res, next) {
    controller.cancel(req.params.eventUrl, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiSuccess(message);
    });
  });

  /* GET home page. */
  router.post('/status', function(req, res, next) {
    controller.status(req.params.eventUrl, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiSuccess(message);
    });
  });

  return router;
}
