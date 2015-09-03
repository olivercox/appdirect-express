## Synopsis

AppDirect Node.js Seed is an template for integrating applications and services with the AppDirect marketplace platform.

For more information on AppDirect see their website http://www.appdirect.com/.

## Motivation

I was tasked with integrating an SaaS application with the AppDirect for distribution on IBM Bluemix Marketplace. The AppDirect documentation is good and improving but there wasn't much in the way of node.js examples. I decided to create this project to provide a quick start integration template for the myself and others.

## Installation

Just clone the repo or download the source zip, once you have the source follow the steps below:-

1. Create an AppDirect application and get the OAuth credentials
2. Create a file in the root folder named app-direct.config
3. Add the Oauth credentials to app-direct.config (see ./sample-app-direct.config for format)
3. Install dependancies

    <pre>npm install</pre>

4. Run the app

    <pre>DEBUG=appdirect-seed* npm start</pre>

By default the api will listen on port 3000. You can use the ping tests within the AppDirect project dashboard to test out the api or hit the api with your own requests (See examples folder).

## Reference

The template has a pretty simple structure:-

    root/
      app.js - The main express application file
      app-direct.config - Config file OAuth credentials
      package.json
      api/
        api-auth.js - OAuth helpers for the api
        api-helpers.js - Helpers for the api
        api-response.js - Middleware for patching the express response object
      bin/
        www - Application start subscription
      controllers/ - This is where you put your application specific integration
        api.js - Simple api ping controllers
        addons.js - The addon endpoints controller
        subscription.js - The subscription endpoints controller
        user.js - The user management endpoints controller
      routes/

## Tests

Coming soon.

## Contributors

Feel free to fork the repository and submit pull requests, all contributions are very welcome.

## License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
