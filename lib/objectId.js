'use strict';

// Load modules

const Any = require('./any');
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

  const obj = internals.convertAndValidate(value, options.convert);

  const result = {
      value: obj.value
  };

  if (obj.valid) {
    result.errors = null;
  } else {
    let type; // used for error strings
    if (value === null) {
      type = 'null';
    } else if (typeof result.value === "string") {
      type = 'wrongSize';
    } else {
      type = 'general';
    }
    result.errors = this.createError('objectId.'.concat(type), null, state, options);
  }

  return result;
};

internals.convertAndValidate = function (value, convert) {
  if (value instanceof ObjectId) {
      return { value, valid: true };
  } else if (typeof value === 'string') {
    if (convert) {
      return (internals.isObjectId(value)
        ? { value: new ObjectId(value), valid: true }
        : { value, valid: false }
      );
    } else {
      return (internals.isObjectId(value)
        ? { value, valid: true }
        : { value, valid: false }
      );
    }
  } else {
    return { value, valid: false };
  }
};

/* TODO: CreatedOnOrAfter, CreatedOnOrBefore, CreatedAfter, CreatedBefore
internals.ObjectId.prototype.createdBefore = function () {}; // returns boolean;
internals.ObjectId.prototype.createdOnOrBefore = function () {}; // returns boolean;
internals.ObjectId.prototype.createdAfter = function () {}; // returns boolean;
internals.ObjectId.prototype.createdOnOrAfter = function () {}; // returns boolean;
*/

module.exports = new internals.ObjectId();
