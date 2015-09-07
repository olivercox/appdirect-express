/**
 * Controller for subscription management APIs
 */

/**
 * Controller method create Subscription.
 * Handles the creation of subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.create = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Subscription created',
    accountIdentifier: 123456
  });
}

/**
 * Controller method change Subscription.
 * Handles upgrading and downgrading subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.change = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Subscription changed'
  });
}

/**
 * Controller method cancel Subscription.
 * Handles the cancellation of subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.cancel = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Subscription cancelled'
  });
}

/**
 * Controller method create Subscription.
 * Handles the updating of subscription status (suspended/expired)
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.status = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Subscription status updated'
  });
}
