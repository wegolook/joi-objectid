#joi-objectid

This npm package is intended to allow Joi to validate BSON ObjectId objects

### usage

```javascript
// import and assignment
const Joi = require('joi'); // use version ^9.0.0
const joiObjectId = require('@wegolook/joi-objectid');
const myJoi = Joi.extend(joiObjectId);

// ...then
const result = myJoi.objectId().validate(myObjectId);
// result.value, result.errors, etc...

// ...or
myJoi.objectId().validate(myObjectId, (err, value) => { /*...*/ });
```
