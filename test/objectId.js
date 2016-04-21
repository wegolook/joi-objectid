'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const ObjectId = require('bson').ObjectId;

const Joi = require('joi');
const joiObjectid = require('../');

Joi.objectId = joiObjectid;

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

// Values used below

const id12 = "A1B2c3d4E5f6";
const id24 = "A1B2c3d4E5f6A1B2c3d4E5f6";
const lt12 = 'a1a1a1a1a1a';
const between = id12 + 'abcdef';
const gt24 = id24 + 'a';
const invalidInput = gt24;




describe('objectId', () => {

  it('does not fail on undefined', (done) => {
    Joi.objectId().validate(undefined, (err, value) => {
      expect(err).to.be.null();
      expect(value).to.be.undefined()
      done();
    });
  });

  it('fails on null', (done) => {
    Joi.objectId().validate(null, (err, value) => {
      expect(err).to.exist();
      expect(value).to.be.null();
      done();
    });
  });

  it('fails on boolean', (done) => {
    Joi.objectId().validate(true, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(true);
    });

    Joi.objectId().validate(false, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(false);
    });

    done();
  });

  it('fails when fewer than 12 characters', (done) => {
    Joi.objectId().validate(lt12, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(lt12);
      done();
    });
  });

  it('fails when between 12 and 24 characters', (done) => {
    Joi.objectId().validate(between, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(between);
      done();
    });
  });

  it('fails when greater than 24 characters', (done) => {

    Joi.objectId().validate(gt24, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(gt24);
      done();
    });
  });

  it('fails on invalid input and convert disabled', (done) => {
    Joi.objectId().options({ convert: false }).validate(invalidInput, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(invalidInput);
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

  it('has a useful error message', (done) => {
    const result = Joi.objectId().validate(lt12);
    expect(result.error.message).to.equal('"value" must have 12 or 24 characters');
    done();
  });

  it('returns the original value given an invalid input', (done) => {

    const result = Joi.objectId().validate(lt12);

    expect(result.value).to.equal(lt12);
    done();
  });
});
