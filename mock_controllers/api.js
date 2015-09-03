/**
 * Controller methods for the base api.
 * This is not a requirement of the CF or AppDirect intergreation
 * Rather it is useful for checking that all is good with the API
 */

/**
 * Controller method for ping.
 * You should update this to check that everything is working.
 * e.g. Database connections, message queues, etc...
 */
module.exports.ping = function(next) {
  return next({ status: 'OK', datetime: new Date() });
}
