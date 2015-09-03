var express = require('express');
var path = require('path');
var qs = require('querystring');
var apiResponse = require('./api/api-response')
var ApiHelpers = require('./api/api-helpers.js');
var ApiAuth = require('./api/api-auth.js');

var users = require('./routes/user');
var api = require('./routes/api');
var subscription = require('./routes/subscription');
var addons = require('./routes/addon');

var config;
var controllers = {
  apiController: null,
  subscriptionController: null,
  userController: null,
  addonController: null
}

function getControllers() {
  return {
    apiController: require(path.join(config.controllers, 'api.js')),
    subscriptionController: require(path.join(config.controllers, 'subscription.js')),
    userController: require(path.join(config.controllers, 'user.js')),
    addonController: require(path.join(config.controllers, 'addon.js'))
  }
}

module.exports = function(app, options) {
  config = options;
  // Check  the correct congif options have been passed
  if(!config) throw new Exception("Options must be passed to the appdirect-express module")
  if(!app) throw new Exception("An express app must be passwed to the appdirect-express module")

  if(config.use_mocks) config.controllers = path.join(__dirname, '/mock_controllers');
  else if(!config.controllers) throw new Exception("You must provide a controllers directory when use_mocks is off")

  // Map the controllers for use later
  controllers = getControllers();

  var apiAuth = ApiAuth(config);
  var apiHelpers = ApiHelpers(config);
  // Setup the api routes passing in the correct Controller
  var baseApi = require('./routes/api.js')(controllers.api, config);
  /**
   * Route middleware for response helpers
   */
  baseApi.use('/', apiResponse);
  /**
   * Route middleware to validate oauth signature
   */
  baseApi.use('/', apiAuth.requireAuth);

  /**
   * Route middleware to validate that event url is present
   */
  baseApi.use('/', apiHelpers.checkForEventUrl)

  /**
   * Route middleware to get event data from the request
   */
  baseApi.use('/', apiHelpers.getEventData)
  baseApi.use('/subscription', require('./routes/subscription.js')(controllers.subscriptionController, config));
  baseApi.use('/user', require('./routes/user.js')(controllers.userController, config))
  baseApi.use('/addon', require('./routes/addon.js')(controllers.addonController, config))
  app.use('/api', baseApi);

  /**
   * Catch 404 and forward to error handler
   */
  baseApi.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  return function(err, req, res, next) {
    console.log(err);
    console.log(err.stack);
    return res.sendApiError('UNKNOWN_ERROR', err.message);
  }
}
