# @wegolook/joi-objectid

[Joi](https://github.com/hapijs/joi) extension to support BSON ObjectId

## Usage

```javascript
// import and assignment
const Joi = require('@hapi/joi'); // use version <=15.x.x
const joiObjectId = require('@wegolook/joi-objectid');
const myJoi = Joi.extend(joiObjectId);

// ...then
const result = myJoi.objectId().validate(myObjectId);
// result.value, result.errors, etc...

// ...or
myJoi.objectId().validate(myObjectId, (err, value) => { /*...*/ });
```

## CI Status

[![Codeship Status for wegolook/joi-objectid](https://app.codeship.com/projects/c4bb03c0-e93f-0133-69df-4a62c9b002a0/status?branch=master)](https://app.codeship.com/projects/147517)
