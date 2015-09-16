var express = require('express');
var path = require('path');
var http = require('http');
var qs = require('querystring');
var appDirect = require('../..')

var app;
var server;

var fixture = module.exports = {
  init: function(done) {
    app = express();
    var appDirectConfig = require('../../app-direct.config')
    appDirectConfig.use_mocks = true;
    app.use(appDirect(app, appDirectConfig));

    /**
     * Catch 404 and forward to error handler
     */
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    server = http.createServer(app);
    server.listen(8012);

    done();
  },
  deinit: function(done) {
    server.close();
    done();
  }
}
