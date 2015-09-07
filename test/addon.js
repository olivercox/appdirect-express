var expect = require("expect.js");
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({ explicitArray: false });
var server = require('./fixtures/server.js');
var Api = require('../routes/api.js');
var OAuth   = require('../oauth');

var appDirectConfig = require('../sample-app-direct.config')
appDirectConfig.use_mocks = true;

var oauth;
/**
 * Addon Ping Route tests
 */
describe('addon - ping tests', function() {
  before(server.init);
  beforeEach(function(done) {
    oauth = OAuth({
        consumer: {
            public: appDirectConfig.oauth_key,
            secret: appDirectConfig.oauth_secret
        },
        signature_method: appDirectConfig.oauth_signature
    });
    done();
  })
  after(server.deinit);

  var tests = [
    {
      type: 'addon order',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonOrder',
        method: 'GET'
      }
    },
    {
      type: 'addon change',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonChange',
        method: 'GET'
      }
    },
    {
      type: 'addon cancel',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonCancel',
        method: 'GET'
      }
    },
    {
      type: 'addon bind',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonBind',
        method: 'GET'
      }
    },
    {
      type: 'addon unbind',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonUnbind',
        method: 'GET'
      }
    }
  ];
  tests.forEach(function(test) {
    it('should return valid test response for ' + test.type, function (done) {
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.get(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'true');
          done();
        });
      });
    });
    it('should return UNAUTHORIZED error code when no auth header is provided for ' + test.type, function(done) {
      var options = {
        url: test.data.url,
        method: test.data.method
      }
      request.get(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'UNAUTHORIZED');
          done();
        });
      });
    });
    it('should return UNAUTHORISED error code when an incorrect auth header is provided for ' + test.type, function(done) {
      // Recreate authApi with incorrect details
      var newConfig = {
        "oauth_key": appDirectConfig.oauth_key,
        "oauth_secret": "12345",
        "oauth_signature": appDirectConfig.oauth_signature
      }
      oauth = OAuth({
          consumer: {
              public: newConfig.oauth_key,
              secret: newConfig.oauth_secret
          },
          signature_method: newConfig.oauth_signature
      });
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.get(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'UNAUTHORIZED');
          done();
        });
      });
    });
    it('should return INVALID_RESPONSE error code when eventUrl is not provided for ' + test.type, function(done) {
      test.data.url = test.data.url.replace('eventUrl', 'removed');
      delete test.data.data;
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.get(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'INVALID_RESPONSE');
          done();
        });
      });
    });
    it('should return UNAUTHORISED error code when an incorrect auth signature method is provided for ' + test.type, function(done) {
      // Recreate authApi with incorrect details
      var newConfig = {
        "oauth_key": appDirectConfig.oauth_key,
        "oauth_secret": appDirectConfig.oauth_secret,
        "oauth_signature": "PLAINTEXT"
      }
      oauth = OAuth({
          consumer: {
              public: newConfig.oauth_key,
              secret: newConfig.oauth_secret
          },
          signature_method: newConfig.oauth_signature
      });
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.get(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'UNAUTHORIZED');
          done();
        });
      });
    });
  });
});

/**
 * Addon POST Route tests
 */
describe('addon - post tests', function() {
  before(server.init);
  beforeEach(function(done) {
    oauth = OAuth({
        consumer: {
            public: appDirectConfig.oauth_key,
            secret: appDirectConfig.oauth_secret
        },
        signature_method: appDirectConfig.oauth_signature
    });
    done();
  })
  after(server.deinit);

  var tests = [
    {
      type: 'assign',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonOrder',
        method: 'POST'
      }
    },
    {
      type: 'assign',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonChange',
        method: 'POST'
      }
    },
    {
      type: 'assign',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonCancel',
        method: 'POST'
      }
    },
    {
      type: 'assign',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonBind',
        method: 'POST'
      }
    },
    {
      type: 'assign',
      data: {
        url: 'http://localhost:8012/api/addon'+
        '?eventUrl=https://www.appdirect.com/api/integration/v1/events/dummyAddonUnbind',
        method: 'POST'
      }
    }
  ];
  tests.forEach(function(test) {
    it('should return valid test response for ' + test.type, function (done) {
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.post(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'true');
          done();
        });
      });
    });
    it('should return UNAUTHORIZED error code when no auth header is provided for ' + test.type, function(done) {
      var options = {
        url: test.data.url,
        method: test.data.method
      }
      request.post(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'UNAUTHORIZED');
          done();
        });
      });
    });
    it('should return UNAUTHORISED error code when an incorrect auth header is provided for ' + test.type, function(done) {
      // Recreate authApi with incorrect details
      var newConfig = {
        "oauth_key": appDirectConfig.oauth_key,
        "oauth_secret": "12345",
        "oauth_signature": appDirectConfig.oauth_signature
      }
      oauth = OAuth({
          consumer: {
              public: newConfig.oauth_key,
              secret: newConfig.oauth_secret
          },
          signature_method: newConfig.oauth_signature
      });
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.post(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'UNAUTHORIZED');
          done();
        });
      });
    });
    it('should return INVALID_RESPONSE error code when eventUrl is not provided for ' + test.type, function(done) {
      test.data.url = test.data.url.replace('eventUrl', 'removed');
      delete test.data.data;
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.post(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'INVALID_RESPONSE');
          done();
        });
      });
    });
    it('should return UNAUTHORISED error code when an incorrect auth signature method is provided for ' + test.type, function(done) {
      // Recreate authApi with incorrect details
      var newConfig = {
        "oauth_key": appDirectConfig.oauth_key,
        "oauth_secret": appDirectConfig.oauth_secret,
        "oauth_signature": "PLAINTEXT"
      }
      oauth = OAuth({
          consumer: {
              public: newConfig.oauth_key,
              secret: newConfig.oauth_secret
          },
          signature_method: newConfig.oauth_signature
      });
      var options = {
        url: test.data.url,
        method: test.data.method,
        headers: oauth.toHeader(oauth.authorize(test.data, null))
      }
      request.post(options, function (err, response, body) {
        if (err) return done(err);
        parser.parseString(body, function (err, result) {
          expect(response).to.have.property('statusCode', 200);
          expect(result.result).to.have.property('success', 'false');
          expect(result.result).to.have.property('errorCode', 'UNAUTHORIZED');
          done();
        });
      });
    });
  });
});
