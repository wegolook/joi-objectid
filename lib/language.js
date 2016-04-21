'use strict';

// Load modules


// Declare internals

const internals = {};


exports.errors = {
  root: 'value',
  key: '"{{!key}}" ',
  messages: {
    wrapArrays: true
  },
  any: {
    unknown: 'is not allowed',
    invalid: 'contains an invalid value',
    empty: 'is not allowed to be empty',
    required: 'is required',
    allowOnly: 'must be one of {{valids}}',
    default: 'threw an error when running default method'
  },
  objectId: {
    null: 'cannot be null',
    wrongSize: 'must have 12 or 24 characters',
    general: 'could not validate data of this type as bson ObjectId'
  }
};
