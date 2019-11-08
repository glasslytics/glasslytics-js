# glasslytics-js

## Getting started
```
npm install glasslytics-js --save
```

Or use `https://raw.githubusercontent.com/glasslytics/glasslytics-js/v1.0.1/dist/glasslytics.min.js`

## Usage
```js
var glasslyticsClient = new GlasslyticsJS('pk_...'); // Your Public Key

// Save a "signup" action, flagged as testing action
glasslyticsClient.actions.push('Signup', true);
// Save a "signup" action
glasslyticsClient.actions.push('Signup');
// Delete all testing actions
glasslyticsClient.actions.cleanTests();
```

## API Documentation
See the [API docs](https://github.com/glasslytics/api-docs).