/**
 * Controller for addon management APIs
 */

/**
 * Controller method create AddOn Subscription.
 * Handles the creation of addon subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.create = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Addon created'
  });
}

/**
 * Controller method change AddOn Subscription.
 * Handles the upgrading/downgrading of addon subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.change = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Addon changed'
  });
}

/**
 * Controller method cancel AddOn Subscription.
 * Handles the cancellation of addon subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.cancel = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Addon cancelled'
  });
}

/**
 * Controller method bind AddOn Subscription.
 * Handles the binding of addon subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.bind = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Addon bound'
  });
}

/**
 * Controller method unbind AddOn Subscription.
 * Handles the unbinding of addon subscriptions
 * PARAMS: eventData - The eventData passed by AppDirect
 */
module.exports.unbind = function(eventData, next) {
  return next(null, {
    success: true,
    errorCode: '',
    message: '*** Mock controller *** Addon unbound'
  });
}
