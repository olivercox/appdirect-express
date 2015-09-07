var expect = require("expect.js");
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({ explicitArray: false });
var server = require('./fixtures/server.js');
var Api = require('../routes/api.js')

var appDirectConfig = require('../sample-app-direct.config')
appDirectConfig.use_mocks = true;

var apiAuth = require('../api/api-auth.js')(appDirectConfig);
/**
 * API Route tests
 */
describe('api', function() {
  before(server.init);
  after(server.deinit);
  /**
   * Api.ping()
   */
  describe('#ping()', function () {
    it('should return valid ping reponse', function (done) {
      var options = {
        url: 'http://localhost:8012/api/ping',
        json: true
      };
      request.get(options, function (err, response, body) {
        if (err) return done(err);
        expect(response).to.have.property('statusCode', 200);
        expect(body).to.have.property('status', 'OK');
        expect(body).to.have.property('datetime');
        done();
      });
    });
  });
});
