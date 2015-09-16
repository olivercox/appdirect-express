var express = require('express');
var router = express.Router();
var apiResponse = require('../api/api-response.js');
var ApiHelpers = require('../api/api-helpers.js');

module.exports = function(controller, config) {
  var apiHelpers = ApiHelpers(config);

  /*
   * The endpoints for subscription
   */
  /* GET Create a subscription. */
  router.get('/create', function(req, res, next) {
    controller.create(req.eventData, function(err, result) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiResponse(result);
    });
  });

  /* GET Change a subscription. */
  router.get('/change', function(req, res, next) {
    controller.change(req.eventData, function(err, result) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiSuccess(result);
    });
  });

  /* GET Cancel a subscription. */
  router.get('/cancel', function(req, res, next) {
    controller.cancel(req.eventData, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiSuccess(message);
    });
  });

  /* GET Update status of a subscription. */
  router.get('/status', function(req, res, next) {
    controller.status(req.eventData, function(err, message) {
        if(err) return res.sendApiError(err.errorCode, err.message);
        return res.sendApiSuccess(message);
    });
  });

  return router;
}
