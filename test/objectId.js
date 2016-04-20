'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Joi = require('joi');
const Helper = require('./helper');
const ObjectId = require('bson').ObjectId;
const joiObjectid = require('../lib/objectId')

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const id12 = "A1B2c3d4E5f6";
const id24 = "A1B2c3d4E5f6A1B2c3d4E5f6";

Joi.objectId = function () {
  return joiObjectid;
};

describe('objectId', () => {

  it('does not fail on undefined or null', (done) => {
    Joi.objectId().validate(undefined, (err, value) => {
      expect(err).to.not.exist();
      expect(value).to.not.exist();
    });

    Joi.objectId().validate(null, (err, value) => {
      expect(err).to.not.exist();
      expect(value).to.not.exist();
    });
  });

  it('fails on boolean', (done) => {
    Joi.objectId().validate(true, (err, value) => {
      expect(err).to.exist();
      done();
    });

    Joi.objectId().validate(false, (err, value) => {
      expect(err).to.exist();
      done();
    });
  });

  it('fails when fewer than 12 characters', (done) => {
    Joi.objectId().validate('a1a1a1a1a1a', (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(undefined);
      done();
    });
  });

  it('fails when between 12 and 24 characters', (done) => {
    Joi.objectId().validate(id12 + 'a', (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(undefined);
      done();
    });
  });

  it('fails when greater than 24 characters', (done) => {
    Joi.objectId().validate(id24 + 'a', (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(undefined);
      done();
    });
  });

  it('fails on invalid input and convert disabled', (done) => {
    Joi.objectId().options({ convert: false }).validate(id24 + 'a', (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(undefined);
      done();
    });
  });

  it('succeeds on 12 character string', (done) => {
    Joi.objectId().validate(id12, (err, value) => {
      expect(err).to.not.exist();
      expect(value instanceof ObjectId).to.be.true();
      done();
    });
  });

  it('succeeds on 24 character string', (done) => {
    Joi.objectId().validate(id24, (err, value) => {
      expect(err).to.not.exist();
      expect(value instanceof ObjectId).to.be.true();
      done();
    });
  });

  it('matches the input string', (done) => {
    Joi.objectId().validate(id24, (err, value) => {
      expect(err).to.not.exist();
      expect(value instanceof ObjectId).to.be.true();
      expect(value.equals(id24)).to.be.true();
      done();
    });
  });

  it('succeeds on instance of ObjectId', (done) => {
    Joi.objectId().validate(ObjectId(id24), (err, value) => {
      expect(value instanceof ObjectId).to.be.true();
      expect(value.equals(ObjectId(id24))).to.be.true();
      done();
    });
  });

  it('succeeds on valid input and convert disabled', (done) => {
    Joi.objectId().options({ convert: false }).validate(id24, (err, value) => {
      expect(err).to.not.exist();
      expect(value).to.equal(id24);
      done();
    });
  });
});
