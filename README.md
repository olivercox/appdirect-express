## Synopsis

AppDirect-Express is an Node.js/Express module for integrating applications and
services with the AppDirect marketplace platform.

For more information on AppDirect see their website http://www.appdirect.com/.

## Motivation

I was tasked with integrating an SaaS application with the AppDirect for
distribution on IBM Bluemix Marketplace. The AppDirect documentation is
good and improving but there wasn't much in the way of node.js examples.
I decided to create this project to provide a reusable module for the myself
and others.

## Installation

Install the module as a dependency in your own project with:-

    npm install appdirect-express --save

Alternatively you can clone the seed template from [here](https://github.com/olivercox/appdirect-seed)

## Getting Started

Using the module is easy

``` javascript
// Require the module. In this case from a local source folder
var appDirect = require('../appdirect-express')

// Create your express app
var app = express();

// Create an appDirect config object (See sample-app-direct.config)
var appDirectConfig = require('./app-direct.config')

// Optionally set use_mocks to true to use the built in mock controllers
// You'll write your own controllers but can test the initial setup with this
appDirectConfig.use_mocks = true;

// Create the appDirect object and pass it a middleware to express
app.use(appDirect(app, appDirectConfig));
```

## Reference

The module has a pretty simple structure:-

    root/
      index.js - The main module file
      sample-app-direct.config - Config file OAuth credentials
      api/
        api-auth.js - OAuth helpers for the api
        api-helpers.js - Helpers for the api
        api-response.js - Middleware for patching the express response object
      mock_controllers/ - Mock controllers for testing purposes only
        api.js - Simple api ping controllers
        addons.js - The addon endpoints controller
        subscription.js - The subscription endpoints controller
        user.js - The user management endpoints controller
      oauth/
        index.js - Module for validating and generating OAuth signatures

## Tests

Run the following command.

    npm test

## Contributors

Feel free to fork the repository and submit pull requests, all contributions are very welcome.

## License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
