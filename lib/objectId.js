'use strict';

const ObjectId = require('bson').ObjectId;

module.exports = {
    name: 'objectId',
    language: {
        base: 'must be a valid ObjectId'
    },
    pre(value, state, options) {

        if (!ObjectId.isValid(value)) {
            return this.createError('objectId.base', { value }, state, options);
        }

        if (options.convert) {
            return new ObjectId(value); // Change the value
        }

        return value; // Keep the value as it was
    }
};
