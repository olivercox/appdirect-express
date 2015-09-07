/**
 * Controller for access management APIs
 */

/**
 * Controller method assign User.
 * Handles the assignment of a User
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.assign = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** User assigned'
  });
}

/**
 * Controller method unassign User.
 * Handles the unassignment of a User
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.unassign = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** User unassigned'
  });
}
