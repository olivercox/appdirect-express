/**
 * Middleware module that adds helper function to response
 * using the helpers ensures that the format of the response is consitent
 * with the requirement of the CF Integration API
 * CF Integration APIs require XML format matching
 * <result>
 *   <success>boolean</success>
 *   <errorCode>string</errorCode>
 *   <message>string</message>
 * </result>
 * This module ensures that the response returned matches the above
 * and provides shortcuts for common responses
 */

var js2xmlparser = require('js2xmlparser');

module.exports = function(req, res, next) {
  var errorCodes = {
      USER_ALREADY_EXISTS: 'The specified user already exists.',
      USER_NOT_FOUND: 'The specified user could not be found.',
      ACCOUNT_NOT_FOUND: 'The specified account could not be found',
      MAX_USERS_REACHED: 'The maximum number of users has been reached',
      UNAUTHORIZED: 'Authoization for the request action failed.',
      OPERATION_CANCELED: 'The operation was cancelled by the user.',
      CONFIGURATION_ERROR: 'The requested action failed to complete.',
      INVALID_RESPONSE: 'The application was unable to process the event.',
      UNKNOWN_ERROR: 'An unknown server error occured',
      PENDING: 'The requested action cannot be completed during provisioning.'
    };
  res.apiError = function(errorCode, message) {
    return {
      success: false,
      errorCode: errorCode,
      message: (message ? message : errorCodes[errorCode])
    }
  };
  res.apiSuccess = function(message) {
    return {
      success: true,
      errorCode: '',
      message: message
    }
  };
  res.sendApiError = function(errorCode, message) {
    return res.sendApiResponse(res.apiError(errorCode, message));
  };
  res.sendApiSuccess = function(message) {
    return res.sendApiResponse(res.apiSuccess(message));
  };
  res.sendApiResponse = function(data) {
    console.log(res.headersSent);
    if(!res.headersSent) {
      res.set('Content-Type', 'application/xml');
      res.send(js2xmlparser("result", data));
    }
  }

  return next();
}
