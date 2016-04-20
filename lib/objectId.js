'use strict';

// Load modules

const Any = require('./any');
const Ref = require('./ref');
const Hoek = require('hoek');
const ObjectId = require('bson').ObjectId;

// Declare internals
const internals = {};

internals.isObjectId = ObjectId.isValid;
internals.invalidObjectId = undefined;

internals.ObjectId = function () {
  Any.call(this);
  this._type = 'ObjectId';
};

Hoek.inherits(internals.ObjectId, Any);

internals.ObjectId.prototype._base = function (value, state, options) {

  const result = {
      value: internals.convertAndValidate(value, options.convert)
  };

  const successfulConversion = (result.value instanceof ObjectId && options.convert);
  const hexStringWasValid = (typeof result.value === "string" && !options.convert);

  if (successfulConversion || hexStringWasValid) {
    result.errors = null;
  } else {
    console.log({value, msg: 'could not validate'});
    result.errors = this.createError('ObjectId', null, state, options);
  }

  return result;
};

internals.convertAndValidate = function (value, convert) {
  if (value instanceof ObjectId) {
      return value;
  } else if (typeof value === 'string') {
    if (convert) {
      return (internals.isObjectId(value) ? new ObjectId(value) : undefined);
    } else {
      return (internals.isObjectId(value) ? value : undefined);
    }
  } else {
    return undefined;
  }
};

/* TODO: CreatedOnOrAfter, CreatedOnOrBefore, CreatedAfter, CreatedBefore
internals.ObjectId.prototype.createdBefore = function () {}; // returns boolean;
internals.ObjectId.prototype.createdOnOrBefore = function () {}; // returns boolean;
internals.ObjectId.prototype.createdAfter = function () {}; // returns boolean;
internals.ObjectId.prototype.createdOnOrAfter = function () {}; // returns boolean;
*/

module.exports = new internals.ObjectId();
