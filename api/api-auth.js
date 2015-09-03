var qs = require('querystring');
var OAuth   = require('../oauth');

function getAuth(data) {
  return oauth.toHeader(oauth.authorize(data, null));
}

function requireAuth(req, res, next) {
  parseAuth(req, res, function(err) {
    if(err) return next(err);
    return validateAuth(req, res, next);
  })
}

function validateAuth(req, res, next) {
  var result = {};
  try {

    if (req.oauthParams['oauth_signature_method'] == 'HMAC-SHA1') {
      var request_data = {
          url: req.protocol + '://' + req.get('Host') + req.originalUrl,
          method: 'GET',
          nonce: req.oauthParams['oauth_nonce'],
          timestamp: req.oauthParams['oauth_timestamp']
      };
      var authData = oauth.authorize(request_data, null);
      if (req.oauthParams['oauth_signature'] != authData.oauth_signature) {
        return res.sendApiError('UNAUTHORIZED',
            'Failed OAuth HMAC-SHA1 verification')
      }
    } else {
      return res.sendApiError('UNAUTHORIZED',
          'Invalid authorization header')
    }
  } catch(err) {
    return res.sendApiError('UNKNOWN_ERROR')
  }
  next()
}

function parseAuth(req, res, next) {
	// Patch aoauthParams objects into the request
  try {
    req.oauthParams = {};
  	req.oauthHeaderParams = {};

  	// Add oauth parameters from the query and body
  	for (var key in req.query)
  		if (key.match(/^oauth_/))
  			req.oauthParams[key] = req.query[key];
  	for (var key in req.body)
  		if (key.match(/^oauth_/))
  			req.oauthParams[key] = req.body[key];

  	// Parse the Authorization header into it if given
  	var hdr = req.header('authorization');
  	if (hdr && hdr.match(/^OAuth\b/i)) {
  		var params = hdr.match(/[^=\s]+="[^"]*"(?:,\s*)?/g);
  		for (var i = 0; i < params.length; i++) {
  			var match = params[i].match(/([^=\s]+)="([^"]*)"/);
  			var key = qs.unescape(match[1]);
  			var value = qs.unescape(match[2]);
  			req.oauthParams[key] = req.oauthHeaderParams[key] = value;
  		}
  	}
    next();
  } catch(err) {
    	return next(err);
  }
};

var config, oauth;
module.exports = function(options) {
  config = options;
  oauth = OAuth({
      consumer: {
          public: config.oauth_key,
          secret: config.oauth_secret
      },
      signature_method: config.oauth_signature
  });
  return {
    requireAuth: requireAuth,
    getAuth: getAuth
  }
}
