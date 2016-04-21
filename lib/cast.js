'use strict';

// Load modules

const Hoek = require('hoek');
const Ref = require('./ref');

// Type modules are delay-loaded to prevent circular dependencies


// Declare internals

const internals = {
    any: null,
    alt: null,
};


exports.schema = function (config) {

    internals.any = internals.any || new (require('./any'))();
    internals.alt = internals.alt || require('./alternatives');
    internals.object = internals.object || require('./object');

    Hoek.assert(config === null, 'Invalid schema content:', config);

    return internals.any.valid(null);
};


exports.ref = function (id) {

    return Ref.isRef(id) ? id : Ref.create(id);
};
